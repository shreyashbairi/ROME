//import modules like express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

const port = process.env.PORT || 8000;
const MONGO_URI= "mongodb+srv://admin:J4U9FdQ50axtrGSl@cluster0.lopfsoc.mongodb.net/?retryWrites=true&w=majority"

//app
const app = express();
app.use(express.json());
 app.use(cors({credentials: true, 
     origin: 'http://localhost:3000',
}));

app.get('/test', (req, res) =>{
    res.json('test ok');
});
app.post('/Submit', (req, res) =>{
    const {userFullname, userEmail, userUserName, userPassword} = req.body;
    res.json({userFullname, userEmail, userUserName, userPassword});
})
//database
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED'))
.catch(err => console.log('DB CONNECTION ERROR', err));


//middleware



//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
