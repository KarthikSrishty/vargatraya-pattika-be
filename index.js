const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./routes/user");
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{ 
    res.json("Welcome To VargatriaPattika Api! :D");
});
app.use("/users", userRouter)
const URL='mongodb+srv://KarthikeyaSrishty:KarthikeyaSrishty@cluster0.g9kov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(URL,{ dbName: "Nanna" });

app.listen(3000, () => console.log('Server running on port 3000'));
