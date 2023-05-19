const { User, Vendor } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // Get a single user
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },

  // Create a user
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // User login
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // Get vendor locations
  async getVendorLocations({ user = null, params }, res) {
    try {
      const vendors = await Vendor.find().select('location');
      const locations = vendors.map(vendor => vendor.location);
      res.json(locations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve vendor locations' });
    }
  },
};
