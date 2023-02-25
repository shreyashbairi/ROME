import React from "react";
import { useState } from "react";


function TodoForm(props) {
    const [titles, setTitles] = useState([])
    const [tasks, setTasks] = useState({
        title:"",
        description:"",
        option:"Personal"
    })

    async function handleSubmit(e) {
        e.preventDefault();
    }

    const handleTitle = (e) => {
        const newTitle = {...titles}
        newTitle[e.target.id] = e.target.value
        setTitles(newTitle)
        console.log(titles)

        const newTask = {...tasks};
        newTask[e.target.id] = e.target.value;
        setTasks(newTask)
        console.log(tasks)
    }

    const handleTask = (e) => {
        const newTask = {...tasks};
        newTask[e.target.id] = e.target.value;
        setTasks(newTask)
        console.log(tasks)
    }

    return (props.trigger) ? (
        <div className="popup">
            <div>
                <h3>New Task</h3>
                <form
                    onSubmit={handleSubmit}
                >
                    <input onChange={handleTitle} id="title" type="text" placeholder="Task Title" />
                    <textarea onChange={handleTask} id="description" type="text" placeholder="Description" />
                    <select onChange={handleTask} id="option">
                        <option id="personal">Personal</option>
                        <option id="team">Team</option>
                    </select>
                    <button>Add</button>
                </form>
                <button onClick={()=> props.setTrigger(false)}>Cancel</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default TodoForm