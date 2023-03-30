import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PersonalTeamTodo() {
    const [tasks, setTasks] = useState([]);
    const [color,setColor] = useState("");

    useEffect( () => {
        console.clear();
        const username = localStorage.getItem('userid');
        axios.get(`/userteamtasks/${username}`)
        .then(res => {
            const tasksGrabed = res.data;
            tasksGrabed.sort((a,b)=> (a.date<b.date) ? -1 : 1);
            setTasks(tasksGrabed);
        })
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        })
    }, [])

    
    return (
        <div>
            <h1 style={{backgroundColor: color}} id='header'>
                Your Tasks
            </h1>
            
            {tasks.map((task)=> {
                return (<div>{task.title}</div>)
            })}
        </div>
    )
}

export default PersonalTeamTodo