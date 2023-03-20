import React, { useState, useEffect } from 'react'
import  { AiFillCloseCircle } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm1'
import {BsThreeDots} from 'react-icons/bs'
import Popup from 'reactjs-popup'
import TodoEdit from './TodoEdit'

function Todo({todos,completeTodo,removeTodo,editTask}) {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [color, setColor] = useState('black');
    

    var currentDate = () => {
        let date = new Date();
        return (date)
    }


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


    function ChangeStyle(deadline) {
        var date = new Date();
        date = date.toISOString().substring(0,10);
        
        var color='';

        useEffect(()=> {
            
        
            if (deadline != null && deadline < date) { //before current
                color = 'red';
            } else {
                color='black';
            }
        
            setColor(color);
            
        },[color]);

        return <></>;
    }

    return (
        <div>
            {todos.map((todo,index)=>{
                return(
                    <div key = {index} class="task">

                        {/* TODO the function with the error */}
                        {/* {ChangeStyle(todo.date)} */}

                        <Popup class="detailedTask" trigger={
                        <button style={{color: color}}>{todo.title}<br></br>{todo.date} </button>} open={show}
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
                        <Popup class="editTask" trigger={ <button>edit</button>} open={edit}
                            onOpen={openedit} position="right center" nested modal>
                            <div class="card">
                            <TodoEdit 
                                    trigger={edit}
                                    setTrigger={closeedit}
                                    scheduleEvent={todo}
                                    title={todo.title}
                                />     
                            </div>
                        </Popup>

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