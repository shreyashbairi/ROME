import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../UserContext'
import axios from 'axios'

function PersonalTeamTodo() {
    const [tasks, setTasks] = useState([]);
    const [color,setColor] = useState("");
    const {user, setUser} = useContext(UserContext);

    useEffect( () => {
        console.clear();
        const username = user.userUserName;
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