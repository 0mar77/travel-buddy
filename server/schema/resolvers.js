const { AuthenticationError } = require("apollo-server-express");
const { User, Vendor, Customer, Service } = require("../models");
const { signToken } = require("../utils/auth");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    // Query all users
    getUsers: async (parent, args) => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to query all users");
      }
    },
    // Query a specific person by ID
    getUserById: async (parent, { userId, username }, context) => {
      try {
        let user;
        if (userId) {
          user = await User.findById(userId);
        } else if (username) {
          user = await User.findOne({ username });
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve user");
      }
    },
    //Query the person that is logged in
    me: async (parent, args, context) => {
      if (context.user._id) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Query the vendor locations only
    getVendorsLocations: async () => {
      try {
        const vendors = await Vendor.find().select("location");
        const locations = vendors.map((vendor) => vendor.location);
        return locations;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve vendor locations");
      }
    },
    // Query all of the vendors
    getCustomers: async () => {
      try {
        const customers = await Customer.find().populate({
          path: "savedExperiences",
          populate: {
            path: "vendor",
            model: "Vendor", // Replace 'Vendor' with the actual name of your Vendor model
          },
        });
        console.log(customers);
        return customers;
      } catch (err) {
        throw new Error("Failed to retrieve all customers");
      }
    },

    getServices: async () => {
      try {
        const services = await Service.find().populate("vendor");
        console.log(services); // Log the services array to inspect its contents

        // Check the value of the _id field in each service
        for (const service of services) {
          console.log(service._id);
        }

        return services;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to retrieve services");
      }
    },

    // Query all of the vendors
    getVendors: async () => {
      try {
        const vendors = await Vendor.find().populate("services");
        return vendors;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to retrieve all vendors");
      }
    },
    getCustomerById: async (parent, { userId }, context) => {
      try {
        let customer;
        if (userId) {
          customer = await Customer.findById(userId).populate({
            path: "savedExperiences",
            populate: {
              path: "vendor",
              model: "Vendor", // Replace 'Vendor' with the actual name of your Vendor model
            },
          });
        }
        return customer;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve customer");
      }
    },
    getVendorById: async (parent, { userId }, context) => {
      try {
        let vendor;
        if (userId) {
          vendor = await Vendor.findById(userId).populate("services");
        }
        return vendor;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve vendor");
      }
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (parent, { username, email, password, usertype }) => {
      try {
        // Check if the user already exists

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }

        let user;
        if (usertype === "Vendor") {
          // Create a Vendor object
          const vendor = new Vendor({ name: username });
          await vendor.save();
          user = await User.create({
            username,
            email,
            password,
            usertype,
            _id: vendor._id,
          });
        } else if (usertype === "Customer") {
          // Create a Customer object
          const customer = new Customer({ name: username });
          await customer.save();
          user = await User.create({
            username,
            email,
            password,
            usertype,
            _id: customer._id,
          });
        } else {
          throw new Error("Invalid usertype");
        }

        const token = signToken(user);
        return { token, user, userId: user._id };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
      }
    },
    // Adding more information to an specific vendor
    addingInfoVendor: async (parent, { location, description }, context) => {
      try {
        console.log(context);
        if (context.user) {
          const vendor = await Vendor.findOneAndUpdate(
            { _id: context.user._id },
            { location, description },
            { new: true }
          );
          return vendor;
        } else {
          throw new Error("You need to be logged in to add info");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add information to the vendor user");
      }
    },
    // Adding more information to an specific customer
    addingInfoCustomer: async (parent, { location }, context) => {
      try {
        if (context.user) {
          const customer = await Customer.findOneAndUpdate(
            { _id: context.user._id },
            { location },
            { new: true }
          );
          return customer;
        } else {
          throw new Error("You need to be logged in to create a service");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add information in to add info");
      }
    },
    // Create a new Vendor Service
    createService: async (
      parent,
      { vendorId, name, description, price, duration, category },
      context
    ) => {
      try {
        // Check if the user is authenticated and has a vendor role
        if (vendorId) {
          // Find the vendor by the user ID
          const vendor = await Vendor.findOne({ _id: vendorId });

          if (!vendor) {
            throw new Error("Vendor not found");
          }

          // Create a new service
          const service = new Service({
            name,
            description,
            price,
            duration,
            category,
            vendor: vendor,
          });

          await service.save();
          // Add the service to the vendor's services array
          vendor.services.push(service);
          await vendor.save();

          return service;
        } else {
          throw new Error(
            "You need to be logged in as a vendor to create a service"
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create service");
      }
    },
    // Saving a Service
    saveService: async (parent, { serviceId }, context) => {
      try {
        // Check if the user is authenticated and has a customer role
        if (context.user) {
          // Find the service by the service ID
          const service = await Service.findById(serviceId).populate("vendor");
          if (!service) {
            throw new Error("Service not found");
          }

          // Find the customer by the user ID
          const savedService = await Customer.findOneAndUpdate(
            { _id: context.user._id },
            {
              $push: { savedExperiences: service },
            },
            { new: true }
          );

          return savedService;
        } else {
          throw new Error(
            "You need to be logged in as a customer to save a service"
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to save the service");
      }
    },
    // Unsave Service
    unsaveService: async (parent, { serviceId }, context) => {
      try {
        // Check if the user is authenticated and has a customer role
        if (context.user) {
          // Find the service by the service ID
          // const service = await Service.findById(serviceId).populate("vendor");
          // if (!service) {
          //   throw new Error("Service not found");
          // }

          // Find the customer by the user ID
          const unsaveService = await Customer.findOneAndUpdate(
            { _id: context.user._id },
            {
              $pull: { savedExperiences: serviceId },
            },
            { new: true }
          );

          return unsaveService;
        } else {
          throw new Error(
            "You need to be logged in as a customer to unsave a service"
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to save the service");
      }
    },
    // Deleting a service
    deleteService: async (parent, { serviceId }) => {
      try {
        const service = await Service.findOneAndDelete({ serviceId });
        if (!service) {
          throw new AuthenticationError("No service found with this id");
        }
        return service;
      } catch (err) {
        console.log(err);
      }
    },
    //For an existing user to login and provide a token
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to log in");
      }
    },
  },
};

module.exports = resolvers;
