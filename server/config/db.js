const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.bold);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
