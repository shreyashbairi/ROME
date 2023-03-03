//import modules like express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Team = require('./models/Team.js');
const Events = require('./models/Events.js');
const Event = require('./models/Event.js');
const Task = require('./models/ToDoSchema.js');
const cookieParser = require('cookie-parser');
const { json } = require('express');
require('dotenv').config();

const port = process.env.PORT || 8000;

//app
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10); 
const jwtSecret = "2326a84bd9f67c9b9cb44a25c4e9a988";

app.use(cookieParser());
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
    const { userFullname, userEmail, userUserName, userPassword } = req.body;

    try {
      // Check if a user with the given userFullname already exists
      const existingUser = await User.findOne({ userUserName });
      if (existingUser) {
        alert("User already exists.");
        return res.status(409).json({ error: 'User already exists' });
      }
      // If no user exists, create a new user
      const userDoc = await User.create({
        userFullname,
        userEmail,
        userUserName, 
        userPassword: bcrypt.hashSync(userPassword, bcryptSalt),
        userBirthday: new Date(),
        userPhone: "",
        userAddress: "",
        userNotification: false
      }); 
      const savedUser = await userDoc.save();
      res.status(201).json(savedUser);
    } catch (e) {
      res.status(422).json(e);    
    }
  });




//for team
app.post('/teamsubmit', async (req, res) =>{
    const {teamID, team, description, username} = req.body;
    try {
        const teamDoc = await Team.create({
            teamID: teamID,
            team: team,
            description: description,
            userid: username,
            role: "manager"
        });
        res.json(teamDoc);
    } catch (e) {
        res.status(422).json(e);    
    }

});

app.get("/teams/:username", async (req,res) => {
    // console.log(req.params.username);
    try{
        console.log(req.params.username);
        const teams = await Team.find({ userid: req.params.username })
        // console.log(events);
        res.json(teams);
    } catch (e){
        // console.log(e)
        res.status(422).json(e);    
    }
});

app.get("/events/:username", async (req,res) => {
    // console.log(req.params.username);
    try{
        // console.log(req.params.username);
        const events = await Event.find({ usernameid: req.params.username })
        // console.log(events);
        res.json(events);
    } catch (e){
        // console.log(e)
        res.status(422).json(e);    
    }
});


app.post('/eventsave', async (req, res) =>{
    const {newDate, newStartTime, newEndTime, newTitle, newDescription, curusername} = req.body;
    try {
        const eventsDoc = await Event.create(
            { usernameid: curusername,
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            title: newTitle,
            description: newDescription
            });
        res.json(eventsDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});

app.post('/eventedit', async (req, res) =>{
    const {newDate, newStartTime, newEndTime, newTitle, newDescription, curusername} = req.body;
    try {
        const eventsDoc = await Event.findOneAndUpdate(
            {title: newTitle , usernameid: curusername},
            {
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            description: newDescription
            });
        // console.log(newTitle);
        // console.log(curusername)
        // console.log(eventsDoc);
        res.json(eventsDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});

app.post('/taskedit', async (req, res) =>{
    const {taskTitle, taskDescription, taskDate, username} = req.body;
    // console.log(req.body)
    try {
        const tasksDoc = await Task.findOneAndUpdate(
            {title: taskTitle, username: username},
            {
            description: taskDescription,
            date: taskDate
            });
        console.log(tasksDoc);
        res.json(tasksDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});

app.post('/tasksave', async (req, res) =>{
    const {id, title, description, date, user} = req.body;
    try {
        const taskDoc = await Task.create({ 
            title: title,
            description: description, 
            date: date,
            username: user
            });
        res.json(taskDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});

app.get("/tasks/:username", async (req,res) => {
    try{
        const tasks = await Task.find({ username: req.params.username })
        // console.log(tasks);
        res.json(tasks);
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

//for login
app.post('/login', async (req, res) => {
    const { userUserName, userPassword } = req.body;
    const userDoc = await User.findOne({ userUserName: userUserName }).catch((error) => next(error));
    // console.log(userDoc);
    if (userDoc) {
      const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);
      console.log(passOk);
      if (passOk) {
        jwt.sign({username:userDoc.userUserName, 
            id:userDoc._id
        }, jwtSecret, {}, (err, token) =>{
            if(err) throw(err);
            res.cookie('token', token).json(userDoc);
        });

      } else {
        res.status(422).json('password not ok');
      }
    } else {
      res.json('User not found');
    }
  });




//middleware

app.post("/editprofile", async (req,res) => {
    const {username, cbirthday, cphone, caddress, cnotification} = req.body;
    try {
        console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userBirthday: new Date(cbirthday),
                // userNotification: cnotification
        });
    } catch (e) {
        res.status(422).json(e); 
    }
    try {
        console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userPhone: cphone,
                // userNotification: cnotification
        });
    } catch (e) {
        res.status(422).json(e); 
    }
    try {
        console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userAddress: caddress,
                // userNotification: cnotification
        });
    } catch (e) {
        res.status(422).json(e); 
    }
});

app.post("/resetpassword", async (req,res) => {
    const {username, userPassword} = req.body;
    try {
        console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userPassword: bcrypt.hashSync(userPassword, bcryptSalt)
            });
        console.log(userDoc);
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e); 
    }
});

app.get("/profile/:username", async (req,res) => {
    try{
        const user = await User.findOne({ userUserName: req.params.username })
        // console.log(tasks);
        res.json(user);
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

// app.get('/profile', async (req, res) => {
//     const { userUserName} = req.body;
//     const userDoc = await User.findOne({ username: userUserName });
//     res.json(userDoc);
// });

//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
