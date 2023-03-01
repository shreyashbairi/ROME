import React from "react";
import "../css/AddEvent.css";
import { useState } from "react";


const AddEvent = () => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");

    function handleEventSubmit (e) {
        e.preventDefault();
        alert(eventTitle)
    }

    return (
<>
    <div class="loginpopup">
        <div class="formPopup" id="popupForm">
            
        <h2>Add Team events</h2>
        <form onSubmit={handleEventSubmit}>
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
        <button type="button" class="btn cancel" >Cancel</button>
        </div>
      </div>

      </>
    )
    
}

export default AddEvent