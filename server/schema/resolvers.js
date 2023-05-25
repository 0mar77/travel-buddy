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
        const customers = await Customer.find().populate("user");
        return customers;
      } catch (err) {
        throw new Error("Failed to retrieve all customers");
      }
    },

    // Query all of the vendors
    getVendors: async () => {
      try {
        const vendors = await Vendor.find();
        return vendors;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to retrieve all vendors");
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
        if (context.user && context.user.usertype === "Vendor") {
          const vendor = await Vendor.findOneAndUpdate(
            { _id: context.user._id },
            { location, description },
            { new: true }
          );
          return vendor;
        } else {
          throw new Error(
            "You need to be logged in as a vendor to create a service"
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add information to the vendor user");
      }
    },
    // Adding more information to an specific customer
    addingInfoCustomer: async (parent, { location }, context) => {
      try {
        if (context.user && context.user.usertype === "Customer") {
          const customer = await Customer.findOneAndUpdate(
            { _id: context.user._id },
            { location },
            { new: true }
          );
          return customer;
        } else {
          throw new Error(
            "You need to be logged in as a vendor to create a service"
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add information to the customer user");
      }
    },
    // Create a new Vendor Service
    createService: async (
      parent,
      { name, description, price, duration, category },
      context
    ) => {
      try {
        // Check if the user is authenticated and has a vendor role
        if (context.user && context.user.usertype === "Vendor") {
          // Find the vendor by the user ID
          const vendor = await Vendor.findOne({ _id: context.user._id });

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
            vendor: vendor._id, // Set the vendor ID for the service
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
        if (context.user && context.user.usertype === "Customer") {
          // Find the customer by the user ID
          const customer = await Customer.findOne({ _id: context.user._id });

          if (!customer) {
            throw new Error("Customer not found");
          }

          // Find the service by the service ID
          const service = await Service.findOne({ _id: serviceId });

          if (!service) {
            throw new Error("Service not found");
          }

          // Add the service to the customer's savedExperiences
          customer.savedExperiences.push({
            vendor: service.vendor,
            service: service._id,
          });
          await customer.save();

          return service;
        } else {
          throw new Error(
            "You need to be logged in as a customer to save a service"
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to save service");
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
