import React from "react";
import "../../css/AddEvent.css";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


const EventDetails = (props) => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const { user } = useContext(UserContext);
    // alert(props.eventDetails.top)
    // console.log(props.eventDetails)

    async function handleEventEdit (e) {
        e.preventDefault();
        const newElapsedEvent = { //grab from user with pop up 
            date: new Date(eventDate),
            startTime: parseInt(eventStartTime.substring(0,2)),
            endTime: parseInt(eventEndTime.substring(0,2)),
            title: eventTitle,
            description: eventDescription,
            teamName: props.event,
            teamID: -1,
            color: "gray"
        };
        newElapsedEvent.date.setDate(newElapsedEvent.date.getDate() + 1);
        let exists = false;
        let team = false;
        let eventIndex = -1;
        for(let i = 0; i < props.events.length; i++) {
            if (props.events[i].teamName !== 'Personal') {
                team = true;
            }else if (props.events[i].title === newElapsedEvent.title) {
                exists = true;
                newElapsedEvent.color = props.events[i].color;
                newElapsedEvent.teamName = props.events[i].color;
                newElapsedEvent.teamID = props.events[i].teamID;
                eventIndex = i;
                break;
            }
        }
        if (team) {
            alert("You can not edit a team event in your personal calendar.")
        } else if (!exists) {
            alert("Event Title Does Not Exist")
        } else if (newElapsedEvent.startTime > newElapsedEvent.endTime) {
            alert("Enter Valid Times");
        } else {
            props.setTrigger();
            props.editEvent(newElapsedEvent);
            const curusername = user.userUserName;
            const newDate = newElapsedEvent.date;
            const newStartTime = newElapsedEvent.startTime;
            const newEndTime = newElapsedEvent.endTime;
            const newTitle = newElapsedEvent.title;
            const newDescription = newElapsedEvent.description;
            const teamName = props.events[eventIndex].teamName;
            const teamID = props.events[eventIndex].teamID;
            const color = props.events[eventIndex].color;
            try {
                await axios.post('/eventedit', {
                    newDate, 
                    newStartTime, 
                    newEndTime, 
                    newTitle, 
                    newDescription, 
                    curusername,
                    teamName,
                    teamID,
                    color
                });
            } catch (e) {
                alert("Event did not Update")
            }
        } 
    }
    
    return (props.trigger) ? (
<>
    <div class="loginpopup">
        <div class="event-details" id="popupForm">
        <h2>Event Details</h2>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Title</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                {props.eventDetails.title}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Team</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                {props.eventDetails.teamName}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Description</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                {props.eventDetails.description}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Date</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                {new Date(new Date(props.eventDetails.date) - 1).toJSON().split("T")[0]}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Start time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
            {props.eventDetails.startTime < 12 ? props.eventDetails.startTime + "am" : 
                (Number(props.eventDetails.startTime) - 12 >= 12 ? 
                ((Number(props.eventDetails.startTime) - 12) == 12 ? 
                ((Number(props.eventDetails.startTime) - 12) + "am" ): "1am") : 
                ((Number(props.eventDetails.startTime) - 12) == 0 ? 12 : 
                (Number(props.eventDetails.startTime) - 12)) + "pm")}
            </div>

        </div>
        <div class="row mt-3">

            <div class="col-sm-3">
               <strong>End time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                {props.eventDetails.endTime < 12 ? props.eventDetails.endTime + "am" : 
                (Number(props.eventDetails.endTime) - 12 >= 12 ? 
                ((Number(props.eventDetails.endTime) - 12) == 12 ? 
                ((Number(props.eventDetails.endTime) - 12) + "am" ): "1am") : 
                ((Number(props.eventDetails.endTime) - 12) == 0 ? 12 : 
                (Number(props.eventDetails.endTime) - 12)) + "pm")}
            </div>
            </div>

            

        <button type="Cancel" class="btn cancel" onClick={()=> props.setTrigger()}>Cancel</button>
        {props.eventDetails.type !== "team" ? 
        <button type="Cancel" class="btn cancel" onClick={()=> props.editFromDetails(props.eventDetails)}>Edit Event</button> :
        ""}
        </div>
      </div>

      </>
    ) : "";
}


export default EventDetails