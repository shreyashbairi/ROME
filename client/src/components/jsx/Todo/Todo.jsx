import React, { useState } from 'react'
import  { AiFillCloseCircle } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm1'
import {BsThreeDots} from 'react-icons/bs'

function Todo({todos,completeTodo,removeTodo,editTask}) {
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
        return <TodoForm change={change} onSubmit={submitUpdate}/>
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
    return (
        <div>
            {todos.map((todo,index)=>{
                return(
                    <div key = {index}>
                        
                        <div key={todo.id} onClick={()=>completeTodo(todo.id)}>
                            {todo.title}
                            {todo.description}
                        </div>

                        <div>
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

export default Todo