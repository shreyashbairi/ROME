import React from "react";
import "../css/AddEvent.css";
import { useState } from "react";


const AddEvent = () => {
    const [popupOpened, setPopupOpened] = useState(false);

    return (
<>
    <div class="loginpopup">
        <div class="formPopup" id="popupForm">
            
        <h2>Add Team events</h2>

        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Title</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input type="event" class="form-control" id="eventtitle"  placeholder="Title" required />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Description</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input type="description" class="form-control" id="eventdescription"  placeholder="Description" required />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Date</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input type="date" class="form-control" id="eventdate"  required />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Start time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input type="time" class="form-control" id="eventstarttime"  required />
            </div>

        </div>
        <div class="row mt-3">

            <div class="col-sm-3">
               <strong>End time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input type="time" class="form-control" id="eventendtime"  required />
            </div>
            </div>

            

        <button type="submit" class="btn">Submit</button>
        <button type="button" class="btn cancel" >Cancel</button>
        </div>
      </div>

      </>
    )
    
}

export default AddEvent