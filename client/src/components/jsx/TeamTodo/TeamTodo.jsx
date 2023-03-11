import React, { useState } from 'react'
import  { AiFillCloseCircle } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'
import TeamTodoForm from './TeamTodoForm'
import {BsThreeDots} from 'react-icons/bs'

function TeamTodo({todos,removeTodo,editTask,progs}) {
    const [change, setChange] = useState({
        id: null,
        value:''
    })
    const [status, setStatus] = useState('')

    const submitUpdate = value => {
        editTask(change.id, value)
        setChange ({
            id:null,
            value: ''
        })
    }


    if (change.id) {
        return <TeamTodoForm change={change} onSubmit={submitUpdate}/>
    }

    const displayIcon = (todo) => {
        console.log(todo)
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return;
        }
        return (
            <AiFillCloseCircle
                onClick={()=>removeTodo(todo.id)}
            />
        )
    }

    function displayDetails(date, description) {
        console.log(date)
        console.log(description)
        if(!description || /^\s*$/.test(description)) {
            description="no discription"
        }
        // return(
        //     <div>
        //         {date}
        //         <br>
        //         </br>
        //         {description}
        //     </div>
        // )
        alert(description)
    }

    const inProgress = () => {
        console.log("in progress")
    }
    return (
        <div>
            {todos.map((todo,index)=>{
                return(
                    <div key = {index} class="task">
                        
                        <div key={todo.id} > 
                        {/* onClick={()=>completeTodo(todo.id)} was removed from above */}
                        <button style={{border:"none"}} onClick={()=>displayDetails(todo.date, todo.description)}>
                            {todo.title} {todo.date}
                            {/* {todo.date} */}
                            
                        </button>
                            
                            
                        </div>
                            
                        <div>
                            {/* onClick={progs(todo.id)} removed from below */}
                            <button style={{border:"none", backgroundColor:"blue", color:"white"}} >In Progress</button>
                            <br></br>
                            <AiFillCloseCircle
                                onClick={()=>removeTodo(todo.id)}
                            />
                            {/* <TiEdit
                                onClick={()=>setChange({id: todo.id, value:todo.text})}
                            /> */}
                        </div>
                        
                    </div>
                    
                )
            })}

        </div>
    )
}

export default TeamTodo