import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


function TodoEdit({trigger,setTrigger,scheduleEvent,title,todo,setTodos,todos}) {
    const [popupOpened, setPopupOpened] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState(todo.description);
    const [taskDate, setTaskDate] = useState((todo.date) ? todo.date : "");
    const [priority, setPriority] = useState({
        HighPriority: todo.HighPriority,
        MediumPriority: todo.MediumPriority,
        LowPriority: todo.LowPriority
    })
    const [reminder, setReminder] = useState(todo.reminder);
    const { user } = useContext(UserContext);

    async function handleSubmit (e) {
        e.preventDefault();
        let exists = false;
        const username = user.userUserName;
            setTrigger();
            const taskTitle=title;
            console.log(taskDate)
            if (reminder && taskDate) {
                try {
                    await axios.post('/taskedit', {
                        taskTitle,
                        taskDescription,
                        taskDate,
                        username,
                        HighPriority: priority.HighPriority,
                        MediumPriority: priority.MediumPriority,
                        LowPriority: priority.LowPriority,
                        reminder: reminder
                    });
                    alert('Task Saved');
                } catch (e) {
                    alert('Task Failed to Save');
                }
            } else if (reminder){
                alert("To set a reminder, you must assign a deadline to the task");
            } else {
                try {
                    await axios.post('/taskedit', {
                        taskTitle,
                        taskDescription,
                        taskDate,
                        username,
                        HighPriority: priority.HighPriority,
                        MediumPriority: priority.MediumPriority,
                        LowPriority: priority.LowPriority,
                        reminder: reminder
                    });
                    alert('Task Saved');
                } catch (e) {
                    alert('Task Failed to Save');
                }
            }

            const editedTask= {
                title:taskTitle,
                description:taskDescription,
                date:taskDate,
                username:username,
                HighPriority: priority.HighPriority,
                MediumPriority: priority.MediumPriority,
                LowPriority: priority.LowPriority,
                reminder: reminder
            }

        const removeArray = [...todos].filter(task => task !== todo)
        const editArr=[editedTask,...removeArray]
        setTodos(editArr);
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
                onChange={e => setTaskDescription(e.target.value)} />
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
                value={taskDate.split("T")[0]}
                onChange={e => setTaskDate(e.target.value)} />
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

        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Set a reminder</strong>
            </div>
            <input
                type="checkbox"
                checked={reminder}
                onClick={()=>setReminder(!reminder)}
            ></input>
        </div>



            

        <button type="submit" class="btn">Submit</button>
        </form>
        </div>
      </div>

      </>
    ) : "";
}


export default TodoEdit