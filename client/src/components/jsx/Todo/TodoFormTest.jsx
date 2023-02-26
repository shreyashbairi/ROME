import React from "react";
import { useState } from "react";


function TodoForm(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [titles, setTitles] = useState([])
    const [tasks, setTasks] = useState({
        title:"",
        description:"",
        option:"Personal"
    })

    async function handleSubmit(e) {
        e.preventDefault();
        setTitle("")
        setDescription("")
        return(
            <div>
                Task Added Successfully
            </div>
        )
    }

    const handleTitle = (e) => {
        const newTitle = {...titles}
        newTitle[e.target.id] = e.target.value
        setTitles(newTitle)
        setTitle(e.target.value)
        // console.log(titles)

        const newTask = {...tasks};
        newTask[e.target.id] = e.target.value;
        setTasks(newTask)
        // console.log(tasks)
    }

    const handleDescription = (e) => {
        const newTask = {...tasks};
        newTask[e.target.id] = e.target.value;
        setTasks(newTask)
        setDescription(e.target.value)
        // console.log(tasks)
    }

    const handleCategory = (e) => {
        const newTask = {...tasks};
        newTask[e.target.id] = e.target.value;
        setTasks(newTask)
        // console.log(tasks)
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popupinner">
                <h3>New Task</h3>
                <form
                    onSubmit={handleSubmit}
                >
                    <input onChange={handleTitle} value={title} id="title" type="text" placeholder="Task Title" />
                    <textarea onChange={handleDescription} value={description} id="description" type="text" placeholder="Description" />
                    <select onChange={handleCategory} id="option">
                        <option id="personal">Personal</option>
                        <option id="team">Team</option>
                    </select>
                    <button type="submit"
                    onClick={()=> {
                        props.setTitles(titles)
                        props.setTasks(tasks)
                        // props.setTrigger(false)
                    }}
                    >Add</button>
                </form>
                <button type="button" onClick={()=> props.setTrigger(false)}>Cancel</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default TodoForm