import React, {useState, useEffect} from 'react'
import TodoList from './TodoList';
import PersonalTeamTodo from './PersonalTeamTodo';

function PersonalTodo() {
    const [type,setType] = useState("Personal");

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
            <button onClick={changeType}>{type}</button>
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