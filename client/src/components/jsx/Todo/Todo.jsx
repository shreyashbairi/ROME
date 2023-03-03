import React, { useState } from 'react'
import  { AiFillCloseCircle } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm1'
import {BsThreeDots} from 'react-icons/bs'
import Popup from 'reactjs-popup'

function Todo({todos,completeTodo,removeTodo,editTask}) {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);


    const [change, setChange] = useState({
        id: null,
        value:''
    })

    const openform = () => {
        setShow(true);
    };

    const closeform = () => {
        setShow(false);
    }

    const openedit = () => {
        setEdit(true);
    };

    const closeedit = () => {
        setEdit(false);
    }

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
                        <Popup class="detailedTask" trigger={<button>
                            {todo.title} {todo.date} </button>} open={show}
                            onOpen={openform} position="right center" nested modal>
                            <div class="card">
                            <h2>Task details</h2>

                            <div class="row mt-3">
                                    <div class="col-sm-3">
                                    <strong>Title</strong>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {todo.title}
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-sm-3">
                                    <strong>Description</strong>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {todo.description}
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-sm-3">
                                    <strong>Date</strong>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {todo.date}
                                    </div>
                                </div>
                                <button type="Cancel" class="btn cancel" onClick={closeform}>Cancel</button>
   
                            </div>

                        </ Popup>
                        <div key={todo.id} > 
                        {/* onClick={()=>completeTodo(todo.id)} was removed from above */}
                        {/* <button>
                            {todo.title} {todo.date}
                        </button> */}
                            
                            
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