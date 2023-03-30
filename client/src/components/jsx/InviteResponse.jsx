import React from "react";
import "../css/TeamPop.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Popup from "reactjs-popup";


axios.defaults.baseURL = 'http://localhost:8000';

function InviteResponse(props) {

    const [name, setName] = useState("");
    const [show, setShow] = useState(false);

    async function handleSubmit(e) {
        alert("HI");
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
        

                <div className="card-body">

                    <h3>Invite Response</h3>

                    <button onClick={()=> handleSubmit()}>Accept</button> 

    

                    
                </div>

    );

}

export default InviteResponse

