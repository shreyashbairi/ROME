import React from "react";
import "../../css/AddEvent.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


const AddTeamEvent = (props) => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const [eventLabel, setEventLabel] = useState("");
    // const [teamName, setTeamName] = useState("");
    const [teamItem, setTeamItem] = useState("");
    const [localTeams, setLocalTeams] = useState([]);
    // const [teamID, setTeamID] = useState(0);

    useEffect( () => { 
        // console.log("ATTEMPT MADE");
        const username = localStorage.getItem('userid');
        const teamname = props.teamName;
        axios.get(`/getteam/${teamname}`)
        .then (res => {
            const teamGrabed = res.data;
            setTeamItem(teamGrabed);
            // console.log(teamsGrabed);
            // setLocalTeams(teamsGrabed);
            // props.setTeams(teamsGrabed);
        });
        // console.log(localTeams);
    }, []);

    async function handleEventSubmit (e) {
        e.preventDefault();
        const newElapsedEvent = { //grab from user with pop up 
            date: new Date(eventDate),
            startTime: parseInt(eventStartTime.substring(0,2)),
            endTime: parseInt(eventEndTime.substring(0,2)),
            title: eventTitle,
            description: eventDescription,
            teamName: props.teamName,
            teamID: -1,
            color: teamItem.color
        };
        newElapsedEvent.date.setDate(newElapsedEvent.date.getDate() + 1);
        if (newElapsedEvent.startTime > newElapsedEvent.endTime) {
            alert("Enter Valid Times");
        } else {
            props.scheduleEvent(newElapsedEvent);
            props.setTrigger();
            const newDate = newElapsedEvent.date;
            const newStartTime = newElapsedEvent.startTime;
            const newEndTime = newElapsedEvent.endTime;
            const newTitle = newElapsedEvent.title;
            const newDescription = newElapsedEvent.description;
            const newTeamName = newElapsedEvent.teamName;
            const newTeamID = newElapsedEvent.teamID;
            const newColor = newElapsedEvent.color;
            
            try {
                await axios.post('/teameventsave', {
                    newDate, 
                    newStartTime, 
                    newEndTime, 
                    newTitle, 
                    newDescription, 
                    newTeamName,
                    newTeamID,
                    newColor
                });
                alert('Event Saved');
            } catch (e) {
                alert('Event Failed to Save');
            }
        } 
    }
    // async function handlSubmit(e) {
    //     e.preventDefault();
    //     try{
    //         await axios.post('/Submit', {

    //         });
    //         alert("Team Successfully Created.  Redirecting you now.");
    //       } catch (e){
    //         alert('Team Creation Failed. Please try again later.')
    //       }

    //     props.onSubmit({

    //     });
        //props.setTrigger(false);
    // }
    
    return (props.trigger) ? (
<>
    <div class="loginpopup">
        <div class="formPopup" id="popupForm">
        <h2>Add Team Events</h2>
        <form autoComplete="off" onSubmit={handleEventSubmit}>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Title</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="event" 
                class="form-control" 
                id="eventtitle"  
                placeholder="Title"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)} required />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Description</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="description" 
                class="form-control" 
                id="eventdescription"  
                placeholder="Description" 
                value={eventDescription} 
                onChange={e => setEventDescription(e.target.value)} required />
            </div>
        </div>
        {/* <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Team</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="lable" 
                class="form-control" 
                id="teamName"  
                placeholder="Team" 
                value={teamName} 
                onChange={e => setTeamName(e.target.value)} required />
            </div>
        </div> */}
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Date</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="date" 
                class="form-control" 
                id="eventdate"  
                value={eventDate}
                onChange={e => setEventDate(e.target.value)} required />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Start time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="time" 
                class="form-control" 
                id="eventstarttime"  
                value={eventStartTime}
                onChange={e => setEventStartTime(e.target.value)} required />
            </div>

        </div>
        <div class="row mt-3">

            <div class="col-sm-3">
               <strong>End time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="time" 
                class="form-control" 
                id="eventendtime" 
                value={eventEndTime}
                onChange={e => setEventEndTime(e.target.value)} required />
            </div>
            </div>

            

        <button type="submit" class="btn">Submit</button>
        </form>
        <button type="Cancel" class="btn cancel" onClick={()=> props.setTrigger()}>Cancel</button>
        </div>
      </div>

      </>
    ) : "";
}


export default AddTeamEvent