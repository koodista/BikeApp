const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
mongoose.set("strictQuery", false);

const connString = process.env.URI;
const client = new MongoClient(connString);

const connectDB = async () => {
  try {
    await mongoose.connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Mongodb connected!!");
  } catch (error) {
    console.log("Mongodb not connected...");
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = connectDB;
