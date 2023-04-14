import React from "react";
import "../css/TeamPop.css";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamHome from "./TeamHome"
axios.defaults.baseURL = 'http://localhost:8000';

function LeaveTeamPop(props) {
    const [team, setTeam] = useState("")
    const [description, setDescription] = useState("")
    const [data, setData] = useState({
        team: {team},
        description: {description}
    })
    const { user } = useContext(UserContext);
    
    async function handleSubmit(e) {
        e.preventDefault();
        // alert(team);
        const username = user.userUserName;
        const teamID = Math.floor(Math.random()*10000);
        const teamname = team;
        try {
            await axios.post('/leaveteam',{
              username,
              teamname
            });
            alert("You have left " + teamname);
        } catch (e){
            alert('You failed to leave ' + teamname)
        }
        // props.onSubmit({
        //     teamID: teamID,
        //     team: team,
        //     description: description
        // });
        props.setTrigger(false);
        setTeam("");
        setDescription("");
    }

    const handleTeam = (e) => {
        setTeam(e.target.value);
        // console.log(team);
        const newdata = {...data}
        newdata[e.target.id]=e.target.value
        setData(newdata)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        const newdata = {...data}
        newdata[e.target.id]=e.target.value
        setData(newdata)
    }

    const openTeamPage = e => {
        return (
            // <BrowserRouter>
            //     <Routes>
            //         <Route path="/team" element={<TeamHome />}/>
            //     </Routes>
            // </BrowserRouter>
            <>
                props.setTrigger(false)
            </>
        )
    }

    return(props.trigger) ? (
        
            <div class="card-body">

                <h3>Leave a team</h3>
                <form 
                    id="new-team-form"
                    onSubmit={handleSubmit}
                > 
                    <div class="col-sm-9 text-secondary mt-5">
                        <input
                            id="team"
                            placeholder="Team Name"
                            type="text"
                            onChange={handleTeam}
                            value={team}
                        />
                    </div>
                    <div class="col-sm-9 text-secondary mt-4">
                    
                    {/* <textarea
                        id="description"
                        placeholder="Your Description"
                        type="text"
                        className="description-box"
                        onChange={handleDescription}
                        value={description}
                    /> */}
                    </div>  
                    <button>Submit</button>

                </form>
                <button className="close" onClick={()=> props.setTrigger(false)}>
                    close
                </button>
                
                {props.children}
            </div>


    ) : "";

}

export default LeaveTeamPop