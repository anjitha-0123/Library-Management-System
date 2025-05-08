import express from "express";
import dotenv from "dotenv";
import {userauth} from "./Routes/userauth.js";
import {adminauth} from "./Routes/adminauth.js"
import cors from 'cors'

import mongoose from "mongoose";

const app=express();
dotenv.config();


app.use(express.json({ limit: "10mb" })); // Increase JSON size limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase URL-encoded data size limit
app.use(express.raw({ limit: "10mb" })); // Handle raw data if necessary
app.use(express.text({ limit: "10mb" })); // Handle text data if necessary


// Use CORS before defining routes
app.use(cors({
  origin: 'http://127.0.0.1:3000',        
  credentials: true
}));


app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
});
app.use(express.json())
app.use("/",userauth)
app.use("/",adminauth)

mongoose.connect("mongodb://localhost:27017/LIBRARY").then(()=>{
    console.log("MongoDB connected successfully to LIBRARY");})
    .catch((error)=>{
      console.error("MongoDB connection failed",error); 
    });
