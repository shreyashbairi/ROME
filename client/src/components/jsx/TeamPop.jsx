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
        try{
            await axios.post('/Submit', {
              team,
              description
            });
            alert("Team Successfully Created.  Redirecting you now.");
          } catch (e){
            alert('Team Creation Failed. Please try again later.')
          }
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
            <BrowserRouter>
                <Routes>
                    <Route path="/team" element={<TeamHome />}/>
                </Routes>
            </BrowserRouter>
        )
    }

    return(props.trigger) ? (
        
        <div className="popup">
            <div className="card">
                <div className="popupinner ">
                    <div className="inner-text">
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
                            <button onClick={openTeamPage}>Submit</button>
                            </div>  
                        </form>
                        <button className="close" onClick={()=> props.setTrigger(false)}>
                            close
                        </button>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    ) : "";

}

export default TeamPop