const { Schema, model } = require('mongoose');

//User schema for vendor that contains name, email, location, services, image, description and cost
//Commented image to test later on
const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    location: {
      type: String,
      required: true,
    },
    services: {
      type: String, 
    },
    // image: {
    //   type: String,
    // },
    description: {
      type: String, 
    },
    cost:{
      type: Number,
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Vendor = model('Vendor', vendorSchema);

module.exports = Vendor;