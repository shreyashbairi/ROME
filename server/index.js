//import modules like express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
require('dotenv').config();

const port = process.env.PORT || 8000;

//app
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10); 

app.use(express.json());
 app.use(cors({credentials: true, 
     origin: 'http://localhost:3000',
}));

//database

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED'))
.catch(err => console.log('DB CONNECTION ERROR', err));



app.get('/test', (req, res) =>{
    res.json('test ok');
});

//mQ9RV3bH6gdeV29w

//User is user schema/type defined in models
//userDoc is new user created 
//SHREY do not confuse the two
app.post('/Submit', async (req, res) =>{
    const {userFullname, userEmail, userUserName, userPassword} = req.body;
    try {
        const userDoc = await User.create({
            userFullname,
            userEmail,
            userUserName, 
            userPassword:bcrypt.hashSync(userPassword, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);    
    }


    
});


//middleware



//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
