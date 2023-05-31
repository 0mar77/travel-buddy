const { Schema, model } = require("mongoose");

//User schema for vendor that contains name, email, location, services, image, description and cost
//Commented image to test later on
const vendorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  description: {
    type: String,
  },
});

const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
