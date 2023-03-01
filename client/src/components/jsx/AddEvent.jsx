import React from "react";
import "../css/AddEvent.css";
import { useState } from "react";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';



function AddEvent(props) {
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            await axios.post('/Submit', {

            });
            alert("Team Successfully Created.  Redirecting you now.");
          } catch (e){
            alert('Team Creation Failed. Please try again later.')
          }

        props.onSubmit({

        });
        //props.setTrigger(false);

    }
    return (props.trigger) ? (
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
            <button type="Cancel" class="btn cancel" onClick={()=> props.setTrigger()}>Cancel</button>
            </div>
        </div>
      </>
    ) : "";
}


export default AddEvent