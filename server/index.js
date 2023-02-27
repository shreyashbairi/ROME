//import modules like express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Team = require('./models/Team.js');
require('dotenv').config();

const port = process.env.PORT || 8000;

//app
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10); 
const jwtSecret = "2326a84bd9f67c9b9cb44a25c4e9a988";

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
//for signup
app.post('/signup', async (req, res) => {  
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
//for team
app.post('/Submit', async (req, res) =>{
    const {team, description} = req.body;
    try {
        const teamDoc = await Team.create({
            team,
            description
        });
        res.json(teamDoc);
    } catch (e) {
        res.status(422).json(e);    
    }


    
});
//for login
app.post('/login', async (req, res) => {
    const { userUserName, userPassword } = req.body;
    const userDoc = await User.findOne({ username: userUserName });
    if (userDoc) {
      const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);
      if (passOk) {
        jwt.sign({username:userDoc.userUserName, id:userDoc._id}, jwtSecret, {}, (err, token) =>{
            if(err) throw(err);
            res.cookie('token', token).json('password ok');
        });

      } else {
        res.status(422).json('password not ok');
      }
    } else {
      res.json('User not found');
    }
  });


//middleware



//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
