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
const TeamEvent = require('./models/TeamEvent.js');
const Notification = require('./models/Notification.js');
const Annoucements = require('./models/Announcements.js');
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

app.post('/annoucements', async (req, res) => {    
    const {title, teamname, description} = req.body;
    console.log("hi");
    try{
        const userDoc = await Annoucements.create({
            title: title,
            description: description,
            teamName: teamname
        });

        const team = await Team.findOne({ team: teamname });
        const manager = team.managerid;
        const usernameList = team.members;
        for (let i = 0; i < usernameList.length; i++) {
            const notification = await Notification.create(
                {
                    fromuser: manager,
                    touser: usernameList[i],
                    type: "announcements",
                    description: description,
                    teamName: teamname,
                    message: manager + " has posted new annoucements in "+ teamname,
                    show: false,
                });
            
        }
        res.status(201).json(userDoc);

    } catch (e){
    }

});

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
        userColor: "#0d6efd",
        userViewMode: 7,
        userTeamList:[],
        notifjoin: true,
        notifpoke: true,
        notiftask: true,
        notifleave: true,
        notifannounce: true
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
    } else {
        res.status(401).json('not authorized');
    }
})

//for logout
app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
    userDoc = null;
    
  });

//for creating a new team TeamPop
app.post('/teamsubmit', async (req, res) =>{
    const {teamID, team, description, username, color, members, userTeamList} = req.body;
    try {
        const teamDoc = await Team.create({
            teamID: teamID,
            team: team,
            description: description,
            managerid: username,
            color: color,
            members: members 
        });
        const user = await User.findOne({ userUserName: username })
        // console.log(user);
        // console.log(user.userTeamList);
        const newUserTeamList = [...user.userTeamList, ...userTeamList];
        const userDoc = await User.findOneAndUpdate(
            { userUserName: username },
            { userTeamList: newUserTeamList }
        );
        res.json(teamDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
    // try {
        
    //     // res.json(userDoc);
    // } catch (e) {
    //     res.status(422).json(e);
    // }
});

app.get("/members/:teamname", async (req,res) => {
    try{
        //console.log(req.params.teamname);
        const team = await Team.findOne({team: req.params.teamname});
        const usernameList = team.members;
        const members= []
        for (let i = 0; i < usernameList.length; i++) {
            const newUser = await User.findOne({userUserName: usernameList[i]});
            members.push(newUser);
        }
        //console.log(members);
        res.json(members);
    } catch (e){
        res.status(422).json(e);    
    }
});
app.get("/announcements/:teamname", async (req,res) => {
    try{
        const annoucements = await Annoucements.find({ teamName: req.params.teamname })

        res.json(annoucements);
    } catch (e){
        res.status(422).json(e);    
    }
});

app.get("/teams/:username", async (req,res) => {
    try{
        const user = await User.findOne({userUserName: req.params.username});
        const teamNameList = user.userTeamList;
        const teams = []
        for (let i = 0; i < teamNameList.length; i++) {
            const newTeam = await Team.findOne({team: teamNameList[i]});
            teams.push(newTeam);
        }
        res.json(teams);
    } catch (e){
        res.status(422).json(e);    
    }
});

app.get("/getteam/:teamname", async (req,res) => {
    try{
        const team = await Team.findOne({team: req.params.teamname});
        res.json(team);
    } catch (e){
        res.status(422).json(e);    
    }
});

app.get("/events/:username", async (req,res) => {
    // console.log(req.params.username);
    try{
        // console.log(req.params.username);
        const events = await Event.find({ usernameid: req.params.username })
        // console.log(events);
        const user = await User.findOne({userUserName: req.params.username});
        const teamNameList = user.userTeamList;
        for (let i = 0; i < teamNameList.length; i++) {
            const teamEvents = await TeamEvent.find({teamName: teamNameList[i]});
            events.push(...teamEvents);
        }
        res.json(events);
    } catch (e){
        // console.log(e)
        res.status(422).json(e);    
    }
});

app.get("/fullteamevents/:teamname", async (req,res) => {
    // console.log(req.params.teamname);
    try{
        // console.log(req.params.username);
        const team = await Team.findOne({team: req.params.teamname});
        const usernameList = team.members;
        // console.log(usernameList);
        const events = []
        for (let i = 0; i < usernameList.length; i++) {
            const newEvents = await Event.find({usernameid: usernameList[i]});
            // console.log(newEvents);
            for (let j =0; j< newEvents.length; j++){
                if (newEvents[j].type === "user") {
                    events.push(newEvents[j]);
                }
            }
            // events.push(...newEvents);
            // console.log("here1");
        }
        const teamEvents = await TeamEvent.find({teamName: req.params.teamname});
        events.push(...teamEvents);
        // console.log("here");
        // res.json(members);
        // const events = await Event.find({ usernameid: req.params.username })
        // console.log(events);
        res.json(events);
    } catch (e){
        // console.log(e)
        res.status(422).json(e);    
    }
});

app.get("/getmanager/:teamname", async (req,res) => {
    //console.log(req.params.teamname);
    try{
        // console.log(req.params.teamname);
        const team = await Team.findOne({ team: req.params.teamname });
        // console.log(team);
        const username = team.managerid;
        // console.log(username);
        const manager = await User.findOne({ userUserName: username });
        res.json(manager);
    } catch (e){
        // console.log(e)
        res.status(422).json(e);    
    }
});

//in AddEvent
app.post('/eventsave', async (req, res) =>{
    const {newDate, newStartTime, newEndTime, newTitle, newDescription, 
           curusername, newTeamName, newTeamID, newColor, newType} = req.body;
    try {
        const eventsDoc = await Event.create(
            { usernameid: curusername,
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            title: newTitle,
            description: newDescription,
            teamName: newTeamName,
            teamID: newTeamID,
            color: newColor,
            type: newType
            });
        res.json(eventsDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});

app.post('/teameventsave', async (req, res) =>{
    const {newDate, newStartTime, newEndTime, newTitle, newDescription, newTeamName, newTeamID, newColor} = req.body;
    try {
        const eventsDoc = await TeamEvent.create(
            { date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            title: newTitle,
            description: newDescription,
            teamName: newTeamName,
            teamID: newTeamID,
            color: newColor,
            type: "team"
            });
        res.json(eventsDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});


app.post('/teamtaskedit', async (req, res) =>{
    const {title, description, date, started,complete, workers,team} = req.body;
    try {
        const teamTasksDoc = await TeamTask.findOneAndUpdate(
            {title: title , description:description, date:date},
            {
            started:started,
            complete:complete,
            workers:workers
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
    const {newDate, newStartTime, newEndTime, newTitle, newDescription, curusername, teamName, teamID, color} = req.body;
    try {
        const eventsDoc = await Event.findOneAndUpdate(
            {title: newTitle , usernameid: curusername},
            {
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            description: newDescription,
            teamName: teamName,
            teamID: teamID,
            color: color
            });
        // console.log(newTitle);
        // console.log(curusername)
        // console.log(eventsDoc);
        res.json(eventsDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});
app.post('/teameventedit', async (req, res) =>{
    const {newDate, newStartTime, newEndTime, newTitle, newDescription, curusername, teamName, teamID, color} = req.body;
    try {
        const eventsDoc = await TeamEvent.findOneAndUpdate(
            {title: newTitle , usernameid: curusername},
            {
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            description: newDescription,
            teamName: teamName,
            teamID: teamID,
            color: color
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
    const {taskTitle, taskDescription, taskDate, username,HighPriority,MediumPriority,LowPriority, reminder} = req.body;
    // console.log(req.body)
    try {
        const tasksDoc = await Task.findOneAndUpdate(
            {title: taskTitle, username: username},
            {
            description: taskDescription,
            date: taskDate,
            HighPriority: HighPriority,
            MediumPriority: MediumPriority,
            LowPriority: LowPriority,
            reminder: reminder
            });
       // console.log(tasksDoc);
        res.json(tasksDoc);
    } catch (e) {
        res.status(422).json(e);    
    }
});

app.post('/tasksave', async (req, res) =>{
    const {id, title, description, date, user, repeating, highpriority, mediumpriority, lowpriority, reminder} = req.body;
    try {
        const taskDoc = await Task.create({ 
            title: title,
            description: description, 
            date: date,
            username: user,
            repeating: repeating,
            HighPriority: highpriority,
            MediumPriority: mediumpriority,
            LowPriority: lowpriority,
            reminder: reminder
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
            workers:workers, //TODO might have made a merge conflict Erin plz check
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

app.get("/getUser/:username", async (req,res) => {
    try{
        const user = await User.findOne({ userUserName: req.params.username })
      
        res.json(user);
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

app.post("/editprofile", async (req,res) => {
    const {username, cbirthday, cphone, caddress, cnotification,cColor,join,poke,task,leave,announce} = req.body;
    console.log(join);
    try {
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userBirthday: new Date(cbirthday),
        });
    } catch (e) {
        res.status(422).json(e); 
    }
    try {
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userPhone: cphone,
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
        });
    } catch (e) {
        res.status(422).json(e); 
    }

    try {
        //console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                userColor: cColor,
        });
    } catch (e) {
        res.status(422).json(e); 
    }


    try {
        //console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                notifjoin: join,
        });
    } catch (e) {
        res.status(422).json(e); 
    }    
    try {
        //console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                notifpoke: poke,
        });
    } catch (e) {
        res.status(422).json(e); 
    }    
    try {
        //console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                notiftask: task,
        });
    } catch (e) {
        res.status(422).json(e); 
    }    try {
        //console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                notifleave: leave,
        });
    } catch (e) {
        res.status(422).json(e); 
    }    try {
        //console.log(req.body);
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {
                notifannounce: announce,
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

app.get("/color/:username", async (req,res) => {
    try{
        const user = await User.findOne({ userUserName: req.params.username })
        // console.log(tasks);
 
        res.json(user.userColor);
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

app.get("/userteamtasks/:user", async (req,res) => {
    try{
        const tasks = await TeamTask.find({workers: {$in: [req.params.user] }})
        res.json(tasks)
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

app.post('/assignMemberToTask',async (req,res) => {
    const {team, task, member} = req.body;
    // console.log(task.title)

    try {

        const taskToUpdate = await TeamTask.findOne({title: task.title, team: team})
        // console.log(taskToUpdate.title)
        const mem = [member, ...taskToUpdate.workers]
        await TeamTask.findOneAndUpdate(
            {title: task.title, team: team},
            {workers: mem}
        );

    } catch(e) {
        res.status(500).json()
    }
});

app.delete("/teamtaskdelete", async(req,res) => {

    // console.log("entered")

    TeamTask.deleteMany({complete: true}, function(err) {
    });
})



app.delete("/deletenotification/:id", async(req,res) => {
    console.log("should be deleting");
    console.log(req.params.id);


    Notification.deleteOne({_id:req.params.id}, function(err) {
    });
})

app.delete("/deleteannoucements/:id", async(req,res) => {
    Annoucements.deleteOne({_id:req.params.id}, function(err) {
    });
})





app.delete("/personaltaskdelete/:title/:user", async(req,res) => {
    

    // console.log(title);

    Task.deleteOne({title:req.params.title, username: req.params.user}, function(err) {
    });
})

app.post('/createtaskreminder', async (req,res)=>{
    // console.clear();
    // console.log(req.method, req.path);
    const {task, user} = req.body;

    const temp = await Notification.findOne(
    {
        fromuser: "",
        touser: user,
        type: "task-reminder",
        description: task.description,
        teamName: "Personal Tasks",
        message:"The task \""+task.title +"\" is due soon.",
        show: false,
    });

    if (!temp) {

    try{
        const notification = await Notification.create(
        {
            fromuser: "",
            touser: user,
            type: "task-reminder",
            description: task.description,
            teamName: "Personal Tasks",
            message:"The task \""+task.title +"\" is due soon.",
            show: false,
        });
        res.json(notification);
    } catch(e){
        res.status(422).json(e);
    }
    } else {
        //console.log("already exists");
    }
})

app.post('/invitenotification', async (req, res) =>{
    const {newFromuser, newTouser, newType, newDescription, 
         newTeamName, newTeamID} = req.body;
    try {
        const notification = await Notification.create(
            {
                fromuser: newFromuser,
                touser: newTouser,
                type: newType,
                description: newDescription,
                teamName: newTeamName,
                teamID: newTeamID,
                show: true,
            });
        res.json(notification);
    } catch (e) {
        res.status(422).json(e);    
    }
});


app.post('/acceptmember', async (req, res) => {
    const {username, teamname, manager, notifid} = req.body;
    console.log("acceptmember");
    console.log(username);
    console.log(manager);
    console.log(teamname);
    try {
        const user = await User.findOne({userUserName: username});
        
        const newUserTeamList = [...user.userTeamList, teamname]
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {userTeamList: newUserTeamList}
        );
        const team = await Team.findOne({team: teamname});
        const newTeamMemberList = [...team.members, username];
        const teamDoc = await Team.findOneAndUpdate(
            {team: teamname},
            {members: newTeamMemberList}
        );
        const notification = await Notification.create(
            {
                fromuser: "",
                touser: manager,
                type: "Join",
                description: "",
                teamName: teamname,
                message: username + " has joined " + teamname,
                show: false,
        });
        Notification.deleteOne({_id: notifid}, function(err) {});
        
       
        res.json(userDoc);
    } catch (e) {
        console.error(e);
        res.status(422).json(e);  
    }
})


app.post('/leaveteam', async (req,res) => {
    const {username, teamname} = req.body;
    try {
        const user = await User.findOne({userUserName: username});
        let newUserTeamList =[]
        for (let i = 0; i < user.userTeamList.length; i++) {
            if (user.userTeamList[i] !== teamname) {
                newUserTeamList.push(user.userTeamList[i])
            }
        }
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {userTeamList: newUserTeamList}
        );
        const team = await Team.findOne({team: teamname});
        let newMemberList =[]
        for (let i = 0; i < team.members.length; i++) {
            if (team.members[i] !== username) {
                newMemberList.push(team.members[i])
            }
        }
        const teamDoc = await Team.findOneAndUpdate(
            {team: teamname},
            {members: newMemberList}
        );
        const manager = team.managerid;
        if (manager === username) {
            console.error(e);
            res.status(422).json(e);
        } else {
            const notification = await Notification.create(
                {
                    fromuser: username,
                    touser: manager,
                    type: "Leave",
                    description: username + " has left " + teamname,
                    teamName: teamname,
                    message: username + " has left " + teamname,
                    show: false,
                });
            res.json(notification);
        }
    } catch (e) {
        console.error(e);
        res.status(422).json(e);
    }
});



app.post('/removemember', async (req,res) => {
    const {username, teamname} = req.body;
    // console.log(username);
    // console.log(teamname);
    try {
        const user = await User.findOne({userUserName: username});
        // let index = -1;
        let newUserTeamList =[]
        for (let i = 0; i < user.userTeamList.length; i++) {
            if (user.userTeamList[i] !== teamname) {
                newUserTeamList.push(user.userTeamList[i])
            }
        }
        // let newUserTeamList = user.userTeamList;
        // if (index != -1) {
        //     newUserTeamList = user.userTeamList.splice(index,1);
        // }
        const userDoc = await User.findOneAndUpdate(
            {userUserName: username},
            {userTeamList: newUserTeamList}
        );
        const team = await Team.findOne({team: teamname});
        let newMemberList =[]
        for (let i = 0; i < team.members.length; i++) {
            if (team.members[i] !== username) {
                newMemberList.push(team.members[i])
            }
        }
        // const j = team.members.indexOf(teamname);
        // const newTeamMemberList = user.members.splice(j,1);
        const teamDoc = await Team.findOneAndUpdate(
            {team: teamname},
            {members: newMemberList}
        );
        res.json(userDoc);  
    } catch (e) {
        console.error(e);
        res.status(422).json(e);
    }
});



app.post('/addpoke', async (req, res) => {
    const { invitedUser, descriptionSent, inviter, inviterTeamName} = req.body;

    try {
      const _existingUser = await User.findOne({userUserName: invitedUser});
      if (!_existingUser) {
        // console.log(_existingUser);
        // console.log("User does not exist.");  
      } 
      else if (_existingUser.userUserName === inviter){
        res.status(422).json({error: "You cannot poke yourself"});
      }
      else {

        const notification = await Notification.create(
            {
                fromuser: inviter,
                touser: invitedUser,
                type: "Poke",
                description: descriptionSent,
                teamName: inviterTeamName,
                message: inviter + " has poked you",
                show: false,
            });
        res.json(notification);

      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/addteammember', async (req, res) => {
    const { invitedUser, descriptionSent, inviter, inviterTeamName} = req.body;

    try {
      const _existingUser = await User.findOne({userUserName: invitedUser});
      if (!_existingUser) {
        // console.log(_existingUser);
        // console.log("User does not exist.");  
      } 
      else if (_existingUser.userUserName === inviter){
        res.status(422).json({error: "You cannot invite yourself to a team."});
      }
      else {

        const notification = await Notification.create(
            {
                fromuser: inviter,
                touser: invitedUser,
                type: "Invite",
                description: descriptionSent,
                teamName: inviterTeamName,
                message: inviter + " sent invite for you to join " + inviterTeamName,
                show: true,
            });
        res.json(notification);

      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/requestteam', async (req, res) => {
    const {fromuser, teamName} = req.body;
    try {
        const team = await Team.findOne({team: teamName});
        // console.log("DEBUG");
        // console.log(team);
        const manager = team.managerid;
        // console.log(team.mangaerid);
        const notification = await Notification.create({
            fromuser: fromuser,
            touser: manager,
            description: "Request",
            type: "Request",
            teamName: teamName,
            message: "Request to join " + teamName + " from " + fromuser,
            show: true,
        })
        res.json(notification);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/completeteamtask', async (req, res) => {
    const {fromuser, teamName, description, title} = req.body;
    try {
        const team = await Team.findOne({team: teamName});
        // console.log("DEBUG");
        // console.log(team);
        const manager = team.managerid;
        // console.log(team.mangaerid);
        const notification = await Notification.create({
            fromuser: fromuser,
            touser: manager,
            description: description,
            type: "task-reminder",
            teamName: teamName,
            message: fromuser + " has completed \"" + title+"\"",
            show: false,
        })

        const teamTasksDoc = await TeamTask.findOneAndUpdate(
            {title: title , description:description},
            {
            started:false,
            complete:true,
            workers:[]
            });
   
        // console.log(newTitle);
        // console.log(curusername)
        // console.log(eventsDoc);
        res.json(teamTasksDoc);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/assignMemberToTask',async (req,res) => {
    const {team, task, member} = req.body;
    // console.log(task.title)

    try {
        const taskToUpdate = await TeamTask.findOne({title: task.title, team: team})
        // console.log(taskToUpdate.title)
        if (taskToUpdate.workers.includes(member)) {
            res.status(58).json()
        }
        const mem = [member, ...taskToUpdate.workers]
        await TeamTask.findOneAndUpdate(
            {title: task.title, team: team},
            {workers: mem}
        );

    } catch(e) {
        console.error(e);
        res.status(500).json()
    }
});

app.get('/notifications/:username', async (req,res) => {
    try{
        // console.log("got to backend");
        const notification = await Notification.find({ touser: req.params.username })
        // console.log(tasks);
        // console.log(notification);
        res.json(notification);
        
    } catch (e){
        // console.log(e);
        res.status(422).json(e);    
    }
});

app.post('/removeworker',async(req,res)=> {
    const {task, username, team} = req.body;
    
    try {
        const taskToUpdate = await TeamTask.findOne({title: task.title, team: team})
        if (!taskToUpdate.workers.includes(username)) {
            res.status(58).json()
        }

        const mem = taskToUpdate.workers;

        const newWorkers = [...mem].filter(user => user !== username)
        await TeamTask.findOneAndUpdate(
            {title: task.title, team: team},
            {workers: newWorkers}
        );

    } catch (e) {
        res.status(422).json(e);
    }
})
    




//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`));

//routes (Note to Team: Requires extra installation from react-router-dom)
