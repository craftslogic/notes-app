
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// Local imports
import config from "./config.json" with { type: "json" };

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";


const app = express();

// middlewares! Ye hamesha routes se upar hone chahiye 
app.use(express.json()); // Ye line zaroori hai req.body ke liye
app.use(cors({ origin: "*" }));


mongoose.connect(config.connectionString).then(() => {
    console.log("connected to mongodb successfully vro !!");
}).catch((err) => {
    console.error("error connecting to mongodb: ", err);
});



// Routes Integration
app.use("/", authRoutes);
app.use("/", noteRoutes);

app.get("/", (req, res) => {
    // res.send("hello from express server ")
    res.json({
        message: "hello from express server ",
        name: "express server",
        creator: "Nabeel"
    })
})




app.listen(process.env.PORT, () => {
    console.log(`express server started listening on port ${process.env.PORT}`);
});



