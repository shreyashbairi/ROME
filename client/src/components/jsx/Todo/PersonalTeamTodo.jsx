import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PersonalTeamTodo() {
    const [tasks, setTasks] = useState([]);

    useEffect( () => {
        console.clear();
        const username = localStorage.getItem('userid');
        axios.get(`/userteamtasks/${username}`)
        .then(res => {
            const tasksGrabed = res.data;
            tasksGrabed.sort((a,b)=> (a.date<b.date) ? -1 : 1);
            setTasks(tasksGrabed);
        })
    }, [])

    
    return (
        <div>
            {tasks.map((task)=> {
                return (<div>{task.title}</div>)
            })}
        </div>
    )
}

export default PersonalTeamTodo