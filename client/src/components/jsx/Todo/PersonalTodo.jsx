import React, {useState, useEffect} from 'react'
import TodoList from './TodoList';
import PersonalTeamTodo from './PersonalTeamTodo';
import axios from 'axios';

function PersonalTodo() {
    const [type,setType] = useState("Personal");
    const [color,setColor] = useState("");

    useEffect( () => {
       // console.clear();
        const username = localStorage.getItem('userid');
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        })
    }, [])

    function changeType() {
        console.log(type)
        if (type === "Personal") {
            setType("Team Tasks");
        } else {
            setType("Personal");
        }
    }

    return (
        <div>
            <div style={{backgroundColor: color}}>
                <br></br>
            <button onClick={changeType}>{type}</button>
            </div>
            {(()=>{
                if (type === "Personal") {
                    return (<TodoList/>)
                } else {
                    return (<PersonalTeamTodo/>)
                }
             })()}
        </div>
    )
}

export default PersonalTodo