import React, { useContext, useEffect } from "react";
import { createContext } from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import '../css/DefaultLayout.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import TeamPop from "./TeamPop"
import Popup from "reactjs-popup";
import axios from "axios";
import { UserContext } from "./UserContext";
//import { TeamContext } from "./TeamContext";
import JoinTeamPop from "./JoinTeamPop";
import LeaveTeamPop from "./LeaveTeamPop";
import  { AiFillBell,AiFillCheckCircle,AiOutlineBell,AiFillCloseCircle,AiFillSetting } from 'react-icons/ai';
import {FaHandPointRight} from 'react-icons/fa';
import AddPoke from "./AddPoke";
import InviteResponse from "./InviteResponse";
export const TeamContext = createContext(null);

//import { UserContext } from "./UserContext";

function DefaultLayout () {
    //const user = useContext(UserContext);
    const navigate = useNavigate();

    const [buttonPop, setButtonPop] = useState(false);
    const [joinPop, setJoinPop] = useState(false);
    const [leavePop, setLeavePop] = useState(false);
    const [isLoggedIn] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(
        Cookies.get('team') || null
      );

    const [color,setColor] = useState("");
    const {user,setUser} = useContext(UserContext);
    //const {teams, setTeams} = useContext(TeamContext);
    const [inviterName, setInviterName] = useState('');
    const [response, setResponse] = useState(0);
    const [responseTeam, setResponsTeam] = useState("");
    const [poke, setAddPoke] = useState(false);

    const [isnotif, setIsnotif] = useState(false);
    let username = "";
    try{
        username = user.userUserName;
    }
    catch{
        navigate('/login');
    }
    const [notif, setNotif] = useState([
        {
            _id: String,
            fromuser: String,
            touser: String,
            description: String,
            type: String,
            teamName: String,
            message: String,
            show: Boolean,
        }
    ]);

    const [teams, setTeams] = useState([{
        teamID: Number,
        team: String,
        description: String,
        managerid: String,  
        color: String,
        members: [String]
    }])

    useEffect( () => { 
        axios.get(`/teams/${username}`)
        .then (res => {
            const teamsGrabed = res.data;
            // console.log("GOT TEAMS");
            // console.log(res.data);
            setTeams(teamsGrabed);
        })
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        });
        axios.get(`/notifications/${username}`)
        .then (res => {
            setNotif(res.data);
            // console.log(res.data);
            if(res.data.length == 0){
                setIsnotif(false);
            }else{
                setIsnotif(true);
            }
        });

    }, [] );

    const newTeamButton = () => {
        setButtonPop(true);
    }

    const joinButton = () => {
        setJoinPop(true);
    }

    const leaveButton = () => {
        setLeavePop(true);
    }

    const addTeam = (newTeam) => {
        if (!newTeam.team || /^\s*$/.test(newTeam.team)) {
            return;
        }
        const withNew = [newTeam,...teams]
        setTeams(withNew)
    } 
    
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );
    const closePoke = () => {
        setAddPoke(false);
    }

    const openPoke = () => {
        setAddPoke(true);
    }

    async function handleInvite(pro){
        console.log(pro);
        let touser = pro.touser;
        let teamname = pro.teamName;
        let notifid = pro._id;
        let manager;
            if (pro.type === "Request" || pro.type === "Invite") {
                if (pro.type === "Request") {
                    username = pro.fromuser;
                    manager = pro.touser;
                    
                } else {
                    username = pro.touser;
                    manager = pro.fromuser;
                }
                teamname = pro.teamName;
                await axios.post('/acceptmember', {
                    username, teamname, manager, notifid
                }).then( res => {
                    let newNotif = [];
                    for (let i = 0; i < notif.length; i++) {
                        if (notif[i]._id !== pro._id) {
                            newNotif.push(notif[i])
                        }
                    }
                    setNotif(newNotif);
                })
        } else if(pro.type === "Poke") {
        }
        // axios.delete(`/deletenotification/${id}`,{})
        // axios.get(`/notifications/${touser}`)
        // .then (res => {
        //     setNotif(res.data);
        //     if(res.data.length === 0){
        //         setIsnotif(false);
        //     }else{
        //         setIsnotif(true);
        //     }
        // });

      };

      async function handleDecline(pro){
        let touser = pro.touser;
        let id = pro._id;
        axios.delete(`/deletenotification/${id}`,{})

        let newNotif = [];
        for (let i = 0; i < notif.length; i++) {
            if (notif[i]._id !== pro._id) {
                newNotif.push(notif[i])
            }
        }
        //console.log(newNotif);
        setNotif(newNotif);
        // axios.get(`/notifications/${touser}`)
        // .then (res => {
        //     setNotif(res.data);
        //     if(res.data.length === 0){
        //         setIsnotif(false);
        //     }else{
        //         setIsnotif(true);
        //     }
        // });

      };


    const handlelogout = async (e) => {
        await axios.post('/logout');
        setUser(null);
        Cookies.remove("token");
        navigate("/Welcome");
      };

    function changeTeam(team) {
        localStorage.setItem('team', team.team);
        setSelectedTeam(team.team);
        Cookies.set('team', team.team);
        console.log("selected team is " + selectedTeam + "team.team is " + team.team);
        
    };

    return (
        <TeamContext.Provider value={selectedTeam}>
        <>
            <nav style={{backgroundColor: color}} class="navbar navbar-light mt-1 rounded">
                <a class="navbar-brand" href="/main">
                    <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="30" height="24" class="pic d-inline-block align-text-top" />
                    Rome
                </a>                   
                <div>  
                <Popup class="addpoke" trigger={<button type="button" class="notif"><FaHandPointRight /></button>} open={poke}
                onOpen={openPoke} position="right center" nested modal>
                    <div class="card">
                        <AddPoke
                            trigger={poke}
                            setTrigger={closePoke}
                        />     
                    </div>
                </ Popup>
                <Popup trigger={  <button type="button" class="btn "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {isnotif ? <AiFillBell/> : <AiOutlineBell/> } </button>  } contentStyle={{ width: '350px' } } > 
                        {notif.length !== 0 ? notif.map((notiff, index)=>{
                            return (       
                                <div key={index}> 
                                    <Popup trigger={<button class="notif"> {notiff.message} </button>} nested modal >
                                        <div class="card">
                                            <div class="card-body">
                                                {notiff.type}
                                                <ColoredLine color="grey" />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <h class="mb-0">Team Name</h>
                                                    </div>
                                                    <div class="col-sm-9 text-secondary">
                                                        {notiff.teamName}
                                                    </div>
                                                </div> 
                                                <ColoredLine color="grey" />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <h class="mb-0">Description</h>
                                                    </div>
                                                    <div class="col-sm-9 text-secondary">
                                                        {notiff.description}
                                                    </div>
                                                </div> 
                                                <ColoredLine color="grey" /> 
                                            </div>
                                        </div>
                                    </Popup>
                                    <div>
                                        {notiff.show ? 
                                            <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleInvite(notiff)}>
                                                <AiFillCheckCircle/> 
                                            </button>  
                                        : null}


                                        <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleDecline(notiff)}>
                                            <AiFillCloseCircle/>                     
                                        </button>  
                                    </div>

                                    <ColoredLine color="grey" />
                                </ div>
            
                            )
                       }) : "You have no notifications"} 



                    
                            
                    </ Popup>
                    <a class="navbar-brand" href="/messenger"> 
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/sibyl/icon-message-square.png" alt="Logo" width="30" height="24" class="" />
                    </a>




         
                    <a class="navbar-brand" href="/profile"> 
                        <AiFillSetting />
                            {/* <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="Logo" width="30" height="24" class="" /> */}
                    </a>
                    <a class="navbar-brand" href="/" onClick={handlelogout}> 
                        logout
                    </a>

                </div>


            </nav> 
            <Outlet />
            <div class="sidebar">
            <div>
                {teams.map((team,index)=>{
                    return (
                        <div key={index}>
                            <div key={team.teamID}>
                                <a href={`/team/${team.team}`}  onClick={()=>changeTeam(team)}>{team.team}</a>
                                    {/* <Link to={`/team/${team.team}`} onClick={()=>changeTeam(team)}>{team.team}</Link> */}
                                    {/* <button onClick={switchTeam}>{team.team}</button> */}
                                    
                            </div>
                        </div>
                    )
                })} 
                <br></br>
                    <div class="add-team">
                        <Popup trigger={<button type="button" class="btn btn-secondary"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" alt="Logo" width="25" height="30" class="rounded mx-auto d-block center" />  </button>} 
                        open={buttonPop} onOpen={newTeamButton} position="right center" nested modal >
                            <div class="card">
                            <TeamPop 
                                trigger={buttonPop} 
                                setTrigger={setButtonPop}
                                onSubmit={addTeam}
                            />   
                            </div>
                        </ Popup>
                    </div>
                </div>
                    <Popup trigger={<button type="button" class="btn btn-secondary">  JoinTeam  </button>} 
                        open={joinPop} onOpen={joinButton} position="right center" nested modal >
                        <div class="card">
                            <JoinTeamPop
                                trigger={JoinTeamPop} 
                                setTrigger={setJoinPop}
                                // onSubmit={}
                            />   
                        </div>
                    </ Popup>
                    <Popup trigger={<button type="button" class="btn btn-secondary">  LeaveTeam  </button>} 
                        open={leavePop} onOpen={leaveButton} position="right center" nested modal >
                        <div class="card">
                            <LeaveTeamPop
                                trigger={LeaveTeamPop} 
                                setTrigger={setLeavePop}
                                // onSubmit={}
                            />   
                        </div>
                    </ Popup>

                <div>


                </div>


            
            </div> 
        </>
        </TeamContext.Provider>
    );
};

export default DefaultLayout;