require("dotenv").config();

// console.log("MONGO URI loaded:");



const express = require("express");
const cors = require("cors");

const connectDb = require("./config/dbConnection");

const {
    addUser,
    updateUser,
    deleteUser,
    getAll
} = require("./service/userService");

const app = express();

const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());


// Test API
app.get("/api/message", (req, res) => {
    res.json({
        message: "This is from localhost:8080/api/message"
    });
});


// Get all users
app.get("/api/getAllUsers", async (req, res) => {
    try {
        const users = await getAll();

        res.status(200).json(users);

    } catch (error) {
        console.error("Error fetching users:", error.message);

        res.status(500).json({
            error: error.message
        });
    }
});


// Add user
app.post("/api/addUser", async (req, res) => {
    try {
        const user = await addUser(req.body);

        res.status(201).json({
            message: "User added successfully",
            user: user
        });

    } catch (error) {
        console.error("Error adding user:", error.message);

        res.status(500).json({
            error: error.message
        });
    }
});


// Update user
app.put("/api/updateUser", async (req, res) => {
    try {
        const user = await updateUser(req.body);

        res.status(200).json({
            message: "User updated successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Delete user
app.delete("/api/deleteUser/:email", async (req, res) => {
    try {
        const user = await deleteUser(req.params.email);

        res.status(200).json({
            message: "User deleted successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Start server
const startServer = async () => {
    await connectDb();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

app.get("/api/testMongo", async (req, res) => {
  console.log("fuck")
    try {
        const mongoose = require("mongoose");

        const users = await mongoose.connection.db
            .collection("users")
            .find({})
            .toArray();

        res.json(users);

    } catch (error) {
        console.error("TEST ERROR:", error);

        res.status(500).json({
            error: error.message
        });
    }
});


startServer();