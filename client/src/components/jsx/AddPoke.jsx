import React from "react";
import "../css/TeamPop.css";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { TeamContext }  from "./DefaultLayout";
import axios from 'axios';
import {FaHandPointRight} from 'react-icons/fa';

// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import TeamHome from "./TeamHome"
axios.defaults.baseURL = 'http://localhost:8000';

function AddPoke(props) {
    const [name, setName] = useState("");
    const teamName = useContext(TeamContext);
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
        const inviterTeamName = teamName;

        axios.get(`/teams/${inviter}`).then(res => {
            teams = res.data;

        })
        try {
            const {inviteInfo} = await axios.post('/addpoke',{
              invitedUser,
              descriptionSent,
              inviter,
              inviterTeamName, 
            });
            alert("Poke Sent!");
          } catch (e){
            alert('Error sending Poke. User not found.')
          }

        props.setTrigger(false);
        setName("");
        setDescription("");
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
//popup for invite
    return(props.trigger) ? (
        
            <div className="card-body">

                <h3>Poke</h3>
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
                    <button>Send</button> 
 
                </form>
                <button className="close" onClick={()=> props.setTrigger()}>
                    close
                </button>
                
            </div>


    ) : "";

}

export default AddPoke