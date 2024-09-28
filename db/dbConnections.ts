import mongoose = require('mongoose');
import '../model/User'



mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/user');

mongoose.connection.on('connected', ()=>{console.log("MongoDB Connected")});

mongoose.connection.on('disconnected', ()=>{console.log("MongoDB Disconnected")});
mongoose.connection.on('error', ()=>{console.log("Error")});