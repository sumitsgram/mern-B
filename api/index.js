import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.routes.js';

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('connected to MongoDB')})
.catch((err)=> {
    console.log(err);
})

const app =  express();
app.use(express.json());

app.listen(4000,()=> {
 console.log('Server listening on port 4000')
});

app.use('/api/user', userRoutes);