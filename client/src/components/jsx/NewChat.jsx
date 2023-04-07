import React from "react";
import "../css/TeamPop.css";
import { useState } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamHome from "./TeamHome"
axios.defaults.baseURL = 'http://localhost:8000';

function NewChatPop(props) {
    const [team, setTeam] = useState("")
    const [otherusername, setOtherusername] = useState("")
    const [description, setDescription] = useState("")
    const [data, setData] = useState({
        team: {team},
        description: {description}
    })

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const username = otherusername;
            axios.get(`/getUser/${username}`).then(res=>{
                if (res.data != null) {
                    props.newChat(res.data);
                    props.setTrigger(false);
                    setTeam("");
                    setDescription("");
                } else {
                    alert('User not Found')
                }
            })
        } catch (e){
            alert('User not Found');
        }
    }

    const handleOtherusername = (e) => {
        setOtherusername(e.target.value);
    }


    return(props.trigger) ? (
        
            <div class="card-body">

                <h3>Create a New Chat</h3>
                <form 
                    id="new-team-form"
                    onSubmit={handleSubmit}
                > 
                    <div class="col-sm-9 text-secondary mt-5">
                        <input
                            id="username"
                            placeholder="Username"
                            type="text"
                            onChange={handleOtherusername}
                            value={otherusername}
                        />
                    </div>
                    <div class="col-sm-9 text-secondary mt-4">
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

export default NewChatPop