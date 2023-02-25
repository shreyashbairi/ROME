import React from "react";
import "../../css/Todo.css";
import { useState } from "react";
import TodoForm from "./TodoFormTest";
import TeamPop from "../newTeamPop";


function Todo({titles, tasks}) {
    const [click, setClick] = useState(false);

    const clicked = e => {
        setClick(true);
    }


    return (
        <div id="container">
            <div id="header">
                <h1>Your Tasks</h1>
                <div>
                    <button className="new-task-button" onClick={clicked}>Add New Task</button>
                </div>
            </div>
            <TodoForm trigger={click} setTrigger={setClick}/>
        </div>

        
    )
}

export default Todo