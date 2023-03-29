import React from "react";
import "../../css/TeamPop.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Popup from "reactjs-popup";


axios.defaults.baseURL = 'http://localhost:8000';

function TeamEditTask(props, {task}) {

    const[teamMembers,setTeamMembers] = useState([]);
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        
        // props.setTrigger(false);
        closeform();
        setName("");
    }

    useEffect( () => {
        const team = localStorage.getItem('team');
        axios.get(`members/${team}`)
        .then(res => {
            const memberList = res.data;
            console.log("members")
            console.log(memberList)
            setTeamMembers(memberList);
        })
    },[])

    

    const openform = () => {
        setShow(true);
    };

    const closeform = () => {
        setShow(false);
    }

//popup for invite
    return (
        
        
            <Popup class="Addteam" trigger={<button type="button" >Edit</button>} open={show}
            onOpen={openform} position="right center" nested modal>
                <div className="card-body">

                    <h3>Edit Task</h3>
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
                        <button onClick={()=>closeform}>Add</button> 
    
                    </form>

                    
                </div>
            </ Popup>

    );

}

export default TeamEditTask

