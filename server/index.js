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
const TeamTask=require('./models/TeamTask');
const cookieParser = require('cookie-parser');

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
        userNotification: false,
        userViewMode: 7
      });
      const savedUser = await userDoc.save();
      res.status(201).json(savedUser);
    } catch (e) {
      res.status(422).json(e);    
    }
  });

//for login
app.post('/login', async (req, res) => {
    const { userUserName, userPassword } = req.body;
    const userDoc = await User.findOne({ userUserName });
    if (!userDoc) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);
      if (passOk) {
        jwt.sign({userUserName: userDoc.userUserName, 
            id: userDoc._id
        }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    }
  });


  
//context has only been set up for login, to preserve login info on every page 
//and after refresh
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    //decrypt token with jwtSecret
    //user data is result of verification
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
            if(err) throw err;
            //grab latest info about user from db
            //send it back to client
            const {userEmail, userUserName, _id} = await User.findById(userData.id);
            res.json({userEmail, userUserName, _id}); 
        })
    }else{
        res.status(401).json('not authorized');
    }
})

//for logout
app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
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
    console.log(req.params.username);
    try{
        // console.log(req.params.username);
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

//in AddEvent
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


app.post('/teamtaskedit', async (req, res) =>{
    const {title, description, date, started,complete} = req.body;
    try {
        const teamTasksDoc = await TeamTask.findOneAndUpdate(
            {title: title , description:description, date:date},
            {
            started:started,
            complete:complete
            });
        // console.log(newTitle);
        // console.log(curusername)
        // console.log(eventsDoc);
        res.json(teamTasksDoc);
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
       // console.log(tasksDoc);
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

app.post('/teamtasksave', async (req, res) =>{
    const {title, description, date, user, complete, started, workers, team} = req.body;
    // console.log(team)
    try {
        const teamTaskDoc = await TeamTask.create({ 
            // teamID: id,
            title: title,
            description: description, 
            date: date,
            username: user,
            complete: complete,
            started:started,
            workers:workers,
            team:team
            });
        res.json(teamTaskDoc);
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

app.get("/teamTasks/:team", async (req,res) => {
    try{
        const tasks = await TeamTask.find({ team: req.params.team })
        console.log(tasks);
        res.json(tasks);
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

app.post("/saveViewMode", async (req,res) => {
    const {username, tempViewMode} = req.body;
    try{
        const user = await User.findOneAndUpdate(
            { userUserName: username },
            { userViewMode: tempViewMode});
        // console.log(user);
        res.json(user);
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

app.get("/getViewMode/:username", async (req,res) => {
    try{
        const user = await User.findOne({ username: req.params.username })
        // console.log(user);
        res.json(user);
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

app.post("/editprofile", async (req,res) => {
    const {username, cbirthday, cphone, caddress, cnotification} = req.body;
    try {
        //console.log(req.body);
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
        //console.log(req.body);
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
        //console.log(req.body);
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
        //console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userPassword: bcrypt.hashSync(userPassword, bcryptSalt)
            });
        //console.log(userDoc);
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

app.delete("/teamtaskdelete", async(req,res) => {

    console.log("entered")

    TeamTask.deleteMany({complete: true}, function(err) {
    });
})




  
  



//middleware



//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
