import React, { useState } from 'react'
import  { AiFillCloseCircle } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'
import TeamTodoForm from './TeamTodoForm'
import {BsThreeDots} from 'react-icons/bs'

function TeamTodo({todos,removeTodo,editTask, started, setStarted,setTodos}) {
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

    function inProgress(todo,id) {
        const newStarted = [todo, ...started];
        setStarted(newStarted);
        const removedTodos = [...todos].filter(todo => todo.id !== id);
        setTodos(removedTodos);
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
                            <button style={{border:"none", backgroundColor:"blue", color:"white"}} onClick={e=>inProgress(todo,todo.id)}>In Progress</button>
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