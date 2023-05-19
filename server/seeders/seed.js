const db = require('../config/connection');
const { Vendor } = require('../models');
const vendorSeeds = require('./vendorSeeds.json');

db.once('open', async () => {
  try {
    await Vendor.deleteMany({});

    await Vendor.create(vendorSeeds);

    console.log('Seed data inserted successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
});
