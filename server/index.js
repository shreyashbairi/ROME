//import modules like express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;
const MONGO_URI= "mongodb+srv://admin:J4U9FdQ50axtrGSl@cluster0.lopfsoc.mongodb.net/?retryWrites=true&w=majority"

//app
const app = express();

//database
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED'))
.catch(err => console.log('DB CONNECTION ERROR', err));


//middleware
app.use(morgan("dev"))
app.use(cors({origin: true, credentials: true}))

//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
