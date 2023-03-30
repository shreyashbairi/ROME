import React, { useContext, useEffect } from "react";
import {Outlet, useNavigate} from "react-router-dom";
import '../css/DefaultLayout.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import TeamPop from "./TeamPop"
import Popup from "reactjs-popup";
import axios from "axios";
import { UserContext } from "./UserContext";
import JoinTeamPop from "./JoinTeamPop";
import  { AiFillBell,AiFillCheckCircle,AiFillCloseCircle } from 'react-icons/ai'
import Cookies from 'js-cookie';
import InviteResponse from "./InviteResponse";

//import { UserContext } from "./UserContext";

function DefaultLayout () {
    //const user = useContext(UserContext);

    const navigate = useNavigate();
    const [buttonPop, setButtonPop] = useState(false);
    const [joinPop, setJoinPop] = useState(false);
    const [isLoggedIn] = useState(false);
    const [color,setColor] = useState("");
    const {user,setUser} = useContext(UserContext);
    const [inviterName, setInviterName] = useState('');
    const [response, setResponse] = useState(0);
    const [responseTeam, setResponsTeam] = useState("");
    const [notif, setNotif] = useState([
        {
            fromuser: String,
            touser: String,
            description: String,
            type: String,
            teamName: String,
        }
    ]);
    const [displayNotif, setDisplayNotif] = useState([
        {
            fromuser: String,
            touser: String,
            description: String,
            type: String,
            teamName: String,
        }
    ]);

    const [teams, setTeams] = useState([{
        teamID: Number,
        team: String,
        description: String
    }])

    useEffect( () => {
        const username = localStorage.getItem("userid");
        axios.get(`/teams/${username}`)
        .then (res => {
            const teamsGrabed = res.data;
            // console.log(teamsGrabed);
            setTeams(teamsGrabed);
        })
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        });
        axios.get(`/notifications/${username}`)
        .then (res => {
            const notificationsGrabed = res.data;
            console.log(notificationsGrabed);
            setNotif(notificationsGrabed);
            // console.log("notif");
            // console.log(notif);
            if (notificationsGrabed.length == 0) {
                setDisplayNotif({
                    fromuser: "",
                    touser: "",
                    description: "",
                    type: "",
                    teamName: "",
                })
            } else {
                setDisplayNotif(notificationsGrabed[0]);
            }
        });
    }, [] );

    const newTeamButton = () => {
        setButtonPop(true);
    }

    const joinButton = () => {
        setJoinPop(true);
    }

    const addTeam = (newTeam) => {
        if (!newTeam.team || /^\s*$/.test(newTeam.team)) {
            return;
        }
        const withNew = [newTeam,...teams]
        setTeams(withNew)
        console.log(teams)
    } 
    
    const goWelcome = () => {
        navigate("/Welcome")
    }



    const handleInvite = async (e) => {
        console.log("here");
        const teamname = displayNotif.teamName;
        const username = localStorage.getItem("userid");
        // const teamname = responseTeam;
        await axios.post('/acceptmember', {
            username, teamname
        })
      };

      const handleDecline = async (e) => {
        console.log("here");
        // const teamname = notif[0].teamName;
        // const username = localStorage.getItem("userid");
        // const teamname = responseTeam;
        // if (response == 0) {
        //     console.log("posting");
        //     await axios.post('/acceptmember', {
        //         username,
        //         teamname
        //     });
        // }
      };

    const handlelogout = async (e) => {
        await axios.post('/logout');
        console.log(user);
        setUser(null);
        localStorage.setItem('userid', "");
        localStorage.setItem('isLoggedIn', 'false'); 
        Cookies.remove("token");
        navigate("/Welcome");
      };

    function changeTeam(team) {
        console.log("Changing team")
        localStorage.setItem('team', team.team)
    };


    return (
        <>
        
            <nav style={{backgroundColor: color}} class="navbar navbar-light mt-1 rounded">
                    <a class="navbar-brand" href="/main">
                    <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="30" height="24" class="pic d-inline-block align-text-top" />
                    Rome
                    </a>
                    
                    {/* PAGENAME */}
                    <div>  
                    <Popup trigger={  <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <AiFillBell/>
                    </button>  }  > 
                    <div>{displayNotif.type} from {displayNotif.fromuser}
                    <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleInvite()}>
                    <AiFillCheckCircle/>
                    </button>  
                    <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleDecline()}>
                    <AiFillCloseCircle/>                     </button>  
                    </div>

                    
                            
                    </ Popup>

         
                        <a class="navbar-brand" href="/profile"> 
<img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="Logo" width="30" height="24" class="" />
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
                                {/* {localStorage.setItem('team', team.team)} */}
                                    <Link to={`/team/${team.team}`} onClick={()=>changeTeam(team)}>{team.team}</Link>
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


                <div>


                </div>


            
            </div> 
        </>
    );
};

export default DefaultLayout;