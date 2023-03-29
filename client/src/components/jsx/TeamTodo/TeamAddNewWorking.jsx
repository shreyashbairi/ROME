import React from "react";
import "../../css/TeamPop.css";
import { useState } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Popup from "reactjs-popup";


axios.defaults.baseURL = 'http://localhost:8000';

function TeamAddNewWorking(props, {teamMembers, task}) {

    const [name, setName] = useState("");
    const [show, setShow] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        closeform();
        setName("");
    }

    async function newWorker(memberUserName) {
        teamMembers = props.teamMembers;
        const exists = teamMembers.some((member) => member === memberUserName)

        if (!exists) {
            alert("This username does not exist in this team");
        } else {

            try {
                await axios.post('/assignMemberToTask', {
                    team: localStorage.getItem("team"),
                    task: task,
                    member:memberUserName
                });
            } catch (e) {
                alert("Member could not be added at this time")
            }

        }

    }

    const openform = () => {
        setShow(true);
    };

    const closeform = () => {
        setShow(false);
    }

//popup for invite
    return (
        
        
            <Popup class="Addteam" trigger={<button type="button" >Add New Working Member</button>} open={show}
            onOpen={openform} position="right center" nested modal>
                <div className="card-body">

                    <h3>Add Worker</h3>
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

export default TeamAddNewWorking

