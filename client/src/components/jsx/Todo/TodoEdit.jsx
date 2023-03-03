import React from "react";
import { useState } from "react";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


const TodoEdit = (props) => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");

    async function handleSubmit (e) {
        e.preventDefault();
        let exists = false;
        const username = localStorage.getItem("userid");
            props.setTrigger();
            const taskTitle=props.title;
            try {
                await axios.post('/taskedit', {
                    taskTitle,
                    taskDescription,
                    taskDate,
                    username
                });
                alert('Task Saved');
            } catch (e) {
                alert('Task Failed to Save');
            }
    } 

    
    return (props.trigger) ? (
<>
    <div class="loginpopup">
        <div class="formPopup" id="popupForm">
        <h2>Edit Task</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
        {/* <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Existing Title</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="event" 
                class="form-control" 
                id="eventtitle"  
                placeholder="Title"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)} required />
            </div>
        </div> */}
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
                value={taskDescription} 
                onChange={e => setTaskDescription(e.target.value)} required />
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
                value={taskDate}
                onChange={e => setTaskDate(e.target.value)} required />
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


export default TodoEdit