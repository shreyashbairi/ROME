import React from "react";
import "../css/TeamPop.css";
import { useState } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamHome from "./TeamHome"
axios.defaults.baseURL = 'http://localhost:8000';

function TeamPop(props) {
    const [team, setTeam] = useState("")
    const [description, setDescription] = useState("")
    const [data, setData] = useState({
        team: {team},
        description: {description}
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const username = localStorage.getItem("userid");
        const teamID = Math.floor(Math.random()*10000);
        try {
            await axios.post('/teamsubmit',{
              teamID,
              team,
              description,
              username
            });
            alert("Team Successfully Created.");
          } catch (e){
            alert('Team Creation Failed. Please try again later.')
          }
        props.onSubmit({
            teamID: teamID,
            team: team,
            description: description
        });
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
        console.log(newdata)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        console.log(description);
        const newdata = {...data}
        newdata[e.target.id]=e.target.value
        setData(newdata)
        console.log(newdata)
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
        
        <div className="inner-text">
            <div class="card-body">

                <h3>Create New Team</h3>
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
                    
                    <textarea
                        id="description"
                        placeholder="Description"
                        type="text"
                        className="description-box"
                        onChange={handleDescription}
                        value={description}
                    />
                    <button>Submit</button>
                    </div>  
                </form>
                <button className="close" onClick={()=> props.setTrigger(false)}>
                    close
                </button>
                
                {props.children}
            </div>
        </div>


    ) : "";

}

export default TeamPop