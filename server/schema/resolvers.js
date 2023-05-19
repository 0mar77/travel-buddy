const { AuthenticationError } = require("apollo-server-express");
const { User, Vendor } = require("../models");
const { signToken } = require("../utils/auth");
const jwt = require("jsonwebtoken");


const resolvers = {
  Query: {
    // Query a specific person by ID
    getUserById: async (parent, { userId, username }, context) => {
      try {
        let user;
        if (userId) {
          user = await User.findById(userId).select("username email");
        } else if (username) {
          user = await User.findOne({ username }).select("username email");
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
      throw new AuthenticationError('You need to be logged in!');
    },

    // Query the vendor locations only
    getVendorsLocations: async () => {
      try {
        const vendors = await Vendor.find().select('location');
        const locations = vendors.map(vendor => vendor.location);
        return locations;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve vendor locations');
      }
    },
    
    // Query all of the vendors and their fields
    getVendors: async () => {
      try {
        const vendors = await Vendor.find();
        return vendors;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to retrieve all vendors');
      }
    }
  
  },

  
  Mutation: {
    // Create a new user
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user, userId: user._id };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
      }
    },
    //For an existing user to login and provide a token
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("No user found with this email address");
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
    }
  } 
}

module.exports = resolvers;
