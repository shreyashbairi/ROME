//import modules like express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//app
const app = express();

//database


//middleware
app.use(morgan("dev"))
app.use(cors({origin: true, credentials: true}))

//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
