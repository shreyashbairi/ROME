import React, { useState, useEffect, useContext } from 'react'
import  { AiFillCloseCircle } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm1'
import {BsThreeDots} from 'react-icons/bs'
import Popup from 'reactjs-popup'
import TodoEdit from './TodoEdit'
import '../../../css/Todo.css';
import { UserContext } from '../../UserContext'
import axios from 'axios'

function Todo({todos,completeTodo,removeTodo,editTask, pastDue, seven, bypriority,setTodos}) {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [color, setColor] = useState('black');
    const [buttonPrinted, setButtonPrinted] = useState(false);
    const copy = [...todos]
    const [mapping, setMapping] = useState([...copy])
    const {user, setUser} = useContext(UserContext);

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

    const displayIcon = (todo) => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return;
        }
        return (
            <AiFillCloseCircle
                    onClick={()=>removeTodo(todo)}
            />
        )
    }

    function displayDetails(date, description) {
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

    async function checkDate() {
        var date = new Date().toISOString().substring(0,10);
        console.log(date);

        todos.forEach(async (task)=>{
            const approaching_task = {
                task: task,
                user: user.userUserName
            }
            if (task.date !== null && task.date.split('T')[0] === date){
                await axios.post('/createtaskreminder', approaching_task);
            }
        })
    }

    

    return (
        <div>
            {(()=>{
                if (bypriority) {
                    todos.sort((a,b)=>
                        (a.HighPriority) ? -1 :
                        (a.MediumPriority && b.LowPriority) ? -1 :
                        1
                    )
                    return(<></>)
                } else {
                    todos.sort((a,b)=> (a.date<b.date) ? -1 : 1);
                }

                checkDate();
                 
            })()}
            {todos.map((todo,index)=>{
                return(
                    <div key = {index} class="task">

                        {/* TODO the function with the error */}
                        {/* {ChangeStyle(todo.date)} */}

                        <Popup class="detailedTask" 
                            trigger={
                                // <button style={todo.date < new Date() && {color: 'red'}}>
                                <div className='filters'>

                                    {(()=>{
                                    var date = new Date();
                                    date.setDate(date.getDate()+7);
                                    if (seven && todo.date <= date.toISOString().substring(0,10) && todo.date >= new Date().toISOString().substring(0,10)) {
                                    {/* list only next seven days */}
                                        return(
                                            <>
                                                <button>
                                                {todo.title}<br></br>
                                                
                                                {(()=>{
                                                    if (Date.parse(todo.date)) {
                                                        return (<div>{todo.date.split("T")[0]}</div>)
                                                    
                                                    }
                                                })()}

                                                    {()=>setButtonPrinted(true)}
                                                    
                                                </button>
                                                <div>

                                                    <Popup class="editTask" trigger={ <button>edit</button>}
                                                         position="right center">
                                                        <div class="card">
                                                        <TodoEdit 
                                                                trigger={edit}
                                                                setTrigger={closeedit}
                                                                scheduleEvent={todo}
                                                                title={todo.title}
                                                                todo={todo}
                                                        />     
                                                        </div>
                                                    </Popup>

                                        
                                                    <div>
                                                        <AiFillCloseCircle
                                                            onClick={()=>removeTodo(todo)}
                                                        />
                                                        {/* <TiEdit
                                                            onClick={()=>setChange({id: todo.id, value:todo.text})}
                                                        /> */}
                                                    </div> 

                                                </div>
                                            </>
                                        )
                                    }
                                    else if (pastDue && !seven && todo.date<new Date().toISOString().substring(0,10)) {
                                    {/* list only past due */}
                                    return(
                                    <>
                                        <button className={!seven && pastDue && (todo.date != null && todo.date < new Date().toISOString().substring(0,10)) ? 'red' : null}>
                                        {todo.title}<br></br>
                                        
                                        {(()=>{
                                                if (Date.parse(todo.date)) {
                                                    return (<div>{todo.date.split("T")[0]}</div>)
                                                
                                                }
                                        })()}

                                            {()=>setButtonPrinted(true)}
                                        </button>
                                        <div>

                                            <Popup class="editTask" trigger={ <button>edit</button>} open={edit}
                                                onOpen={openedit} position="right center" nested modal>
                                                <div class="card">
                                                <TodoEdit 
                                                        trigger={edit}
                                                        setTrigger={closeedit}
                                                        scheduleEvent={todo}
                                                        title={todo.title}
                                                        todo={todo}
                                                    />     
                                                </div>
                                            </Popup>
                                    
                                            <div>
                                                <AiFillCloseCircle
                                                    onClick={()=>removeTodo(todo)}
                                                />
                                            </div>

                                        </div>
                                    </>
                                    )
                                    
                                    } else if (!pastDue && !seven) {

                                    {/* default list all */}
                                    return(
                                    <>
                                        <button className={!seven && !pastDue && (todo.date != null && todo.date < new Date().toISOString().substring(0,10)) ? 'red' : null}>
                                            {todo.title}<br></br>
                                            
                                            {(()=>{
                                                if (Date.parse(todo.date)) {
                                                    return (<div>{todo.date.split("T")[0]}</div>)
                                                
                                                }
                                            })()}


                                            {()=>setButtonPrinted(true)}
                                        </button>
                                        <div>

                                            <Popup class="editTask" trigger={ <button>edit</button>} open={edit}
                                                onOpen={openedit} position="right center" nested modal>
                                                <div class="card">
                                                <TodoEdit 
                                                        trigger={edit}
                                                        setTrigger={closeedit}
                                                        scheduleEvent={todo}
                                                        title={todo.title}
                                                        todo={todo}
                                                    />     
                                                </div>
                                            </Popup>
                                    
                                            <div>
                                                <AiFillCloseCircle
                                                    onClick={()=>removeTodo(todo)}
                                                />
                                                {/* <TiEdit
                                                    onClick={()=>setChange({id: todo.id, value:todo.text})}
                                                /> */}
                                            </div>

                                        </div>
                                    </>)

                                    }

                                    })()}
                                </div>
                            } 
                            position="right center" nested modal
                        >
                            
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
                                <div class="row mt-3">
                                    <div class="col-sm-3">
                                    <strong>Priority</strong>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    {(()=>{
                                        if (todo.HighPriority) {
                                            return(<div>High</div>)
                                        } 
                                        else if (todo.MediumPriority) {
                                            return(<div>Medium</div>)
                                        }
                                        else {
                                            return(<div>Low</div>)
                                        }
                                    })()}
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-sm-3">
                                    <strong>Reminder Set</strong>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    {(()=>{
                                        if (todo.reminder) {
                                            return(<div>True</div>)
                                        }
                                        else {
                                            return(<div>False</div>)
                                        }
                                    })()}
                                    </div>
                                </div>
   
                            </div>
                                
                                

                        </ Popup>

                        
                        

                        
                        
                    </div>
                    
                    
                )
            })}
        </div>
        
    )
}

export default Todo