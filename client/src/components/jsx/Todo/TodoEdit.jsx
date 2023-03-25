import React from "react";
import { useState } from "react";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


function TodoEdit({trigger,setTrigger,scheduleEvent,title,todo}) {
    const [popupOpened, setPopupOpened] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [priority, setPriority] = useState({
        HighPriority: todo.HighPriority,
        MediumPriority: todo.MediumPriority,
        LowPriority: todo.LowPriority
    })

    async function handleSubmit (e) {
        e.preventDefault();
        let exists = false;
        const username = localStorage.getItem("userid");
            setTrigger();
            const taskTitle=title;
            try {
                await axios.post('/taskedit', {
                    taskTitle,
                    taskDescription,
                    taskDate,
                    username,
                    HighPriority: priority.HighPriority,
                    MediumPriority: priority.MediumPriority,
                    LowPriority: priority.LowPriority
                });
                alert('Task Saved');
            } catch (e) {
                alert('Task Failed to Save');
            }
    } 

    
    return (trigger) ? (
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
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Priority</strong>
            </div>
            <label>
                <input
                    type={'radio'}
                    value={true}
                    checked={priority.HighPriority}
                    onClick={()=>setPriority({HighPriority:true,MediumPriority:false,LowPriority:false})}
                />High
            </label>
            <label>
                <input
                    type={'radio'}
                    value={true}
                    checked={priority.MediumPriority}
                    onClick={()=>setPriority({HighPriority:false,MediumPriority:true,LowPriority:false})}
                />Medium
            </label>
            <label>
                <input
                    type={'radio'}
                    value={true}
                    checked={priority.LowPriority}
                    onClick={()=>setPriority({HighPriority:false,MediumPriority:false,LowPriority:true})}
                />Low
            </label>
        </div>



            

        <button type="submit" class="btn">Submit</button>
        </form>
        </div>
      </div>

      </>
    ) : "";
}


export default TodoEdit