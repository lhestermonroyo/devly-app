require('dotenv').config();
const { MONGODB_URI } = process.env;
const mongoose = require('mongoose');

const DatabaseError = require('../responses/DatabaseError');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to MongoDB.');
  } catch(err) {
    console.log(new DatabaseError(`Failed to connect to database: ${err}`));    
    
    process.exit(1);
  }
}

module.exports = connectDB;