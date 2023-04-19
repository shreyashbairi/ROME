import React from "react";
import "../css/TeamPop.css";
import { useState } from "react";
import { useContext } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamHome from "./TeamHome"
import { TeamContext }  from "./DefaultLayout";

import { useSelector } from 'react-redux';
axios.defaults.baseURL = 'http://localhost:8000';

function RemoveTeamMember(props) {
    const [name, setName] = useState("")
    let teams = [];
    const [description, setDescription] = useState("")
    const teamname = useContext(TeamContext);
    const [data, setData] = useState({
        name: {name},
        description: {description}
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const username = name;
        const teamname = localStorage.getItem("team");
        // const descriptionSent = description;
        // console.log("The inviter is " + inviter);
        // console.log("The team is " + team);
        // console.log("The teamID is " + teamID);
        // axios.get(`/teams/${inviter}`).then(res => {
        //     teams = res.data;
        //     console.log("These teams have been grabbed from" + inviter + ". The teams are" + JSON.stringify(teams));

        // })
        //console.log("The teamID is " + teamID);
        try {
            await axios.post('/removemember',{
              username,
              teamname
            });
            alert("User Removed!");
          } catch (e){
            alert('Error sending invite. User not found.')
          }
        // props.onSubmit({
        //     name: name,
        //     description: description
        // });
        props.setTrigger(false);
        setName("");
        setDescription("");
    }

    // const handleName = (e) => {
    //     setName(e.target.value);
    //     // console.log(team);
    //     const newdata = {...data}
    //     newdata[e.target.id]=e.target.value
    //     setData(newdata)
    //     //console.log(newdata)
    // }

    // const handleDescription = (e) => {
    //     setDescription(e.target.value);
    //     console.log(description);
    //     const newdata = {...data}
    //     newdata[e.target.id]=e.target.value
    //     setData(newdata)
    //     //console.log(newdata)
    // }

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
//popup for invite
    return(props.trigger) ? (
        
            <div className="card-body">

                <h3>Remove user</h3>
                <form 
                    id="new-team-form"
                    onSubmit={handleSubmit}
                > 
                    <div class="col-sm-9 text-secondary mt-5">
                        <input
                            id="team"
                            placeholder="Name"
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    {/* <div class="col-sm-9 text-secondary mt-4">
                    <textarea
                        id="description"
                        placeholder="Description"
                        type="text"
                        className="description-box"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                    </div>  */}
                    <button>Submit</button> 
 
                </form>
                <button className="close" onClick={()=> props.setTrigger()}>
                    close
                </button>
                
            </div>


    ) : "";

}

export default RemoveTeamMember