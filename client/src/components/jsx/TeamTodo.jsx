import React, { useState } from 'react'
import  { AiFillCloseCircle } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'
import TeamTodoForm from './TeamTodoForm'
import {BsThreeDots} from 'react-icons/bs'

function TeamTodo({todos,completeTodo,removeTodo,editTask}) {
    const [change, setChange] = useState({
        id: null,
        value:''
    })

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

    // return todos.map((todo,index)=>(
    //     <div 
    //     className={todo.isComplete ? 'todo-row complete' :
    //     'todo-row'} 
    //     key={index}>

    //         <div key={todo.id} onClick={()=>completeTodo(todo.id)}>
    //             {todo.text}
    //         </div>
    //         <div
    //             className="icons"
    //         >
    //             <AiFillCloseCircle
    //                 onClick={()=>removeTodo(todo.id)}
    //                 className='delete-task-icon'
    //             />
    //             {/* <TiEdit 
    //                 onClick={()=>setChange({id: todo.id, value:todo.text})}
    //                 className='edit-task-icon'
    //             /> */}
    //         </div>

    //     </div>
    // ))

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
    return (
        <div>
            {todos.map((todo,index)=>{
                return(
                    <div key = {index} class="task">
                        
                        <div key={todo.id} > 
                        {/* onClick={()=>completeTodo(todo.id)} was removed from above */}
                        <button onClick={()=>displayDetails(todo.date, todo.description)}>
                            {todo.title} {todo.date}
                            {/* {todo.date} */}
                        </button>
                            
                            
                        </div>
                            
                        <div>
                            <AiFillCloseCircle
                                onClick={()=>removeTodo(todo.id)}
                            />
                            <form>
                                <select>
                                    <option>Not Started</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </form>
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