import React from "react";
import "../../css/TeamPop.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Popup from "reactjs-popup";


axios.defaults.baseURL = 'http://localhost:8000';

function InviteResponse(props, {task}) {

    const [name, setName] = useState("");
    const [show, setShow] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const username = localStorage.getItem("userid");
        const teamname = props.notif.teamName;
        try {
            await axios.post('/acceptmember', {
                username,
                teamname
            });
        } catch (e) {
            alert("Failed to join team");
        }
        // props.setTrigger(false);
        closeform();
        setName("");
    }

    useEffect( () => {

    },[])


    

    const openform = () => {
        setShow(true);
    };

    const closeform = () => {
        setShow(false);
    }

//popup for invite
    return (
        
        
            <Popup class="Addteam" trigger={<button type="button" >InviteResponse</button>} open={show}
            onOpen={openform} position="right center" nested modal>
                <div className="card-body">

                    <h3>Invite Response</h3>
                    <form 
                        id="new-team-form"
                        onSubmit={handleSubmit}
                    > 
                        <div class="col-sm-9 text-secondary mt-5">
                            <input
                                id="team"
                                placeholder="username"
                                type="text"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <button>Add</button> 
    
                    </form>

                    
                </div>
            </ Popup>

    );

}

export default InviteResponse

