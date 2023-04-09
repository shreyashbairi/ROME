import React from "react";
import "../css/TeamPop.css";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamHome from "./TeamHome"
axios.defaults.baseURL = 'http://localhost:8000';

function AddTeamMember(props) {
    const [name, setName] = useState("")
    let teams = [];
    const { user } = useContext(UserContext);
    const [description, setDescription] = useState("")
    const [data, setData] = useState({
        name: {name},
        description: {description}
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const invitedUser = name;
        const descriptionSent = description;
        const inviter = user.userUserName;
        const inviterTeamName = localStorage.getItem("team");

        axios.get(`/teams/${inviter}`).then(res => {
            teams = res.data;

        })
        //console.log("The teamID is " + teamID);
        try {
            const {inviteInfo} = await axios.post('/addteammember',{
              invitedUser,
              descriptionSent,
              inviter,
              inviterTeamName, 
            });
            alert("Invitation Sent!");
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

                <h3>Send Invites</h3>
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
                    <div class="col-sm-9 text-secondary mt-4">
                    <textarea
                        id="description"
                        placeholder="Description"
                        type="text"
                        className="description-box"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                    </div> 
                    <button>Submit</button> 
 
                </form>
                <button className="close" onClick={()=> props.setTrigger()}>
                    close
                </button>
                
            </div>


    ) : "";

}

export default AddTeamMember