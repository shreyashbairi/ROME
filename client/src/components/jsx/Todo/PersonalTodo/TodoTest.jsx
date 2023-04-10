import React from "react";
import "../../css/Todo.css";
import { useState } from "react";
import TodoForm from "./TodoFormTest";
import TodoList from "./TodoList";


function Todo(){
    const [click, setClick] = useState(false);
    const [titles, setTitles] = useState([])
    const [tasks, setTasks] = useState({
        title:"",
        description:"",
        option:""
    })

    const addTask = task => {
        const newTasks = [task, ...tasks]
        setTasks(newTasks)
    }


    const clicked = e => {
        setClick(true);
    }

    // const test = [
    //     {
    //         age:"7",
    //         type:"human"
    //     },
    //     {
    //         age:"75",
    //         type:"dwarf"
    //     },
    //     {
    //         age:"143",
    //         type:"warlock"
    //     }
    // ]
    return (
        <div id="container">
            <div id="header">
                <h1>Your Tasks</h1>
                <div>
                    <button className="new-task-button" onClick={clicked}>Add New Task</button>
                </div>
            </div>
            
            {/* <div>
                {test.map((tester)=>{
                    return <div>{tester.type}</div>
                })}
            </div> */}
            <TodoForm trigger={click} setTrigger={setClick} setTitles={setTitles} setTasks={setTasks}/>
            
            {/* {titles} */}
            
        </div>

        
    )
}

export default Todo