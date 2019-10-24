require('dotenv').config();
const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to MongoDB.');
  } catch(err) {
    console.log(err);

    process.exit(1);
  }
}

module.exports = connectDB;