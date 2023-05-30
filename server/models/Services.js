const { Schema, model } = require("mongoose");

//User service
//Commented image to test later on
const servicesSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    category: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Service = model("Service", servicesSchema);

module.exports = Service;
