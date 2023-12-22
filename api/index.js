import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import bodyParser from 'body-parser';

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('connected to MongoDB')})
.catch((err)=> {
    console.log(err);
})

const app = express();
app.use(express.json());

app.listen(4000,()=> {
 console.log('Server listening on port 4000')
});

// Middleware to handle JSON requests
app.use(bodyParser.json());

// Middleware to handle CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message ||'Internal server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
     });
})