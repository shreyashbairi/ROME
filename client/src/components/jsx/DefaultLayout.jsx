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



//import { UserContext } from "./UserContext";

function DefaultLayout () {
    //const user = useContext(UserContext);

    const navigate = useNavigate();
    const [buttonPop, setButtonPop] = useState(false);
    const [joinPop, setJoinPop] = useState(false);

    const {user,setUser} = useContext(UserContext);

    const [teams, setTeams] = useState([{
        teamID: String,
        team: String,
        description: String
    }])

    useEffect( () => {
        const username = localStorage.getItem("userid");
        axios.get(`/teams/${username}`)
        .then (res => {
            const teamsGrabed = res.data;
            console.log(teamsGrabed);
            setTeams(teamsGrabed);
        })
    }, [] )

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

    const handlelogout = async () => {
        await axios.post('/logout');
        navigate("/Welcome");
        setUser(null);
      };
    return (
        <>
        
            <nav class="navbar navbar-light bg-primary mt-1 rounded">
                    <a class="navbar-brand" href="/main">
                    <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="30" height="24" class="pic d-inline-block align-text-top" />
                    Rome
                    </a>
                    
                    {/* PAGENAME */}
                    <div>  
                    {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton> */}
                    {/* <div class="dropdown mt-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="book-dropdown" data-bs-toggle="dropdown">
          Choose a book title
        </button>
        <ul class="dropdown-menu" aria-labelledby="book-dropdown">
          <li><a class="dropdown-item" href="#">Become a React Superhero</a></li>
          <li><a class="dropdown-item" href="#">Conquering Vue.js</a></li>
          <li><a class="dropdown-item" href="#">Levelling up Your Next.js</a></li>
        </ul>
      </div> */}
 
                    <Popup trigger={<button type="button" class="">                     <img src="https://static.vecteezy.com/system/resources/previews/006/086/198/original/notification-icon-for-web-vector.jpg" alt="Logo" width="35" height="35" class="" />
                        </button>}  >
                        <p>Here is my notification</p>
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

            {/* <a href="#bar">                        
                <img src="https://www.hyperakt.com/assets/images/fc-barcelona/_1200x1200_crop_center-center_82_line/Barcelona.jpg" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a>
            <a href="#real">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a> */}
            <div>
                {teams.map((team,index)=>{
                    return (
                        <div key={index}>
                            <div key={team.teamID}>
                                    <Link to={`/team/${team.teamID}`}>{team.team}</Link>
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