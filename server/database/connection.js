const mongoose = require("mongoose");

module.exports.connectMongoDB = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1);
    });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB connection lost");
  });
};
