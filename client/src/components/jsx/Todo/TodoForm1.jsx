import '../../css/Todo.css';
import React, { useState, useContext } from 'react';
import { UserContext } from "../UserContext";
import axios from 'axios';

export function TodoForm(props) {
    const [title,setTitle] = useState(props.change ? props.change.value : '');
    const [description,setDescription] = useState(props.change ? props.change.value : '');
    const [input, setInputs] = useState({
        title:"",
        description:"",
        date:""
    })
    const [repeating, setRepeating] = useState(false);
    const [priority, setPriority] = useState({
        high: false,
        medium: false,
        low: true
    })
    const { user } = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const newTask = {
            id: Math.floor(Math.random()*10000),
            title: title,
            description: description,
            date: input.date,
            user: user.userUserName,
            repeating: repeating,
            highpriority: priority.high,
            mediumpriority: priority.medium,
            lowpriority: priority.low
        }

        try {
            await axios.post('/tasksave', 
                newTask
            );
            alert('Task Saved');
        } catch (e) {
            alert('Task Failed to Save');
        }

        props.onSubmit({
            id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            date: newTask.date
        });



        console.log(props)

        setTitle("");
        setDescription("");
        setInputs({
            title:"",
            description:"",
            date:""
        })
        setRepeating(false);
    };
    

    const inputChange = (e) => {
        setTitle(e.target.value)
        const newTasks = {...input}
        newTasks[e.target.id]=e.target.value
        setInputs(newTasks)
        console.log(input)
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value)
        const newTasks = {...input}
        newTasks[e.target.id]=e.target.value
        setInputs(newTasks)
        console.log(input)
    }

    const changeDate = (e) => {
        const newTasks = {...input}
        newTasks[e.target.id]=e.target.value
        setInputs(newTasks)
        console.log(input)
    }


    return (props.trigger) ? (
            <form 
                autoComplete='off'
                className='todo-form'
                onSubmit={handleSubmit}   
            >
                {props.change ? (
                    <>
                        <input 
                            placeholder = {title}
                            className = "New_Task"
                            type="text"
                            value={title}
                            // ref={inputRef}
                            onChange={inputChange}
                            id="title"
                            name="title"

                        />
                        <textarea
                            placeholder={description}
                            value={description}
                            onChange={descriptionChange}
                            id="description"
                            name="description"
                        />
                        <input name="date" onChange={changeDate} id="date" type="date" placeholder={input.date}></input>
                        <button className='todo-button'>Add</button>
                        
                    </>
                ) :
                <>
                    <input 
                        placeholder = "Enter new task"
                        className = "New_Task"
                        type="text"
                        value={title}
                        // ref={inputRef}
                        onChange={inputChange}
                        id="title"
                        name="title"

                    />
                    <textarea
                        placeholder='Description'
                        value={description}
                        onChange={descriptionChange}
                        id="description"
                        name="description"
                    />
                    <input name="date" onChange={changeDate} id="date" type="date"></input>
                    <br></br>
                Repeating?
                <br></br>
                <label>
                    <input
                        type={'radio'}
                        value={false}
                        onClick={()=>setRepeating(true)}
                        checked={repeating}
                    />Yes
                </label>
                     
                <label>
                    <input
                        type={'radio'}
                        value={true}
                        checked={!repeating}
                        onClick={()=>setRepeating(false)}
                    />No
                </label>
                <br></br>
                Priority Rank
                <br></br>
                <label>
                    <input
                        type={'radio'}
                        checked={priority.high}
                        onClick={()=>setPriority({high: true, medium: false, low: false})}
                    />High
                </label>
                     
                <label>
                    <input
                        type={'radio'}
                        checked={priority.medium}
                        onClick={()=>setPriority({high: false, medium: true, low: false})}
                    />Medium
                </label>
                <label>
                    <input
                        type={'radio'}
                        checked={priority.low}
                        onClick={()=>setPriority({high: false, medium: false, low: true})}
                    />Low
                </label>
                
                <br></br>
                    <button className='todo-button'>Add</button>
                    <button type="button" onClick={()=> props.setTrigger(false)}>Cancel</button>
                    </>
                }
                
            </form>
    ) : "";
}

export default TodoForm