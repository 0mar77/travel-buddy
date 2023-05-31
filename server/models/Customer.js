const { Schema, model } = require("mongoose");

//User schema for customer that contains name, email, location, preferedVendors, savedExperiences
//Commented image to test later on
const customerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      unique: true,
    },
    location: {},
    savedExperiences: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Customer = model("Customer", customerSchema);

module.exports = Customer;
