import React from "react";
import "../css/TeamPop.css";
import { useState } from "react";
import axios from 'axios';
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

    return(props.trigger) ? (
        <div className="popup">
            <div className="popupinner">
                <div className="inner-text">
                    <h3>Create New Team</h3>
                    <form 
                        id="new-team-form"
                        onSubmit={handleSubmit}
                    > 
                        
                        <input
                            id="team"
                            placeholder="Team Name"
                            type="text"
                            onChange={handleTeam}
                            value={team}
                        />
                        <textarea
                            id="description"
                            placeholder="Description"
                            type="text"
                            className="description-box"
                            onChange={handleDescription}
                            value={description}
                        />
                        <button>Submit</button>
                    </form>
                </div>
                
                <button className="close" onClick={()=> props.setTrigger(false)}>
                    close
                </button>
                {props.children}
            </div>
        </div>
    ) : "";

}

export default TeamPop