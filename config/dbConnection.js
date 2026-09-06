const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        console.log("Connecting to MongoDB...");

        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
        console.log("Database:", connection.connection.name);
        console.log("Host:", connection.connection.host);

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDb;