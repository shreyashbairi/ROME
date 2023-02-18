import '../../css/Todo.css';
import React, { useState,useEffect,useRef } from 'react';

export function TodoForm(props) {
    const [text,setText] = useState("");
    const inputRef = useRef(null);
    useEffect(()=>{
        inputRef.current.focus()
    })

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random()*10000),
            text: text
        });

        setText("");
    };

    const inputChange = (e) => {
        setText(e.target.value)
    }


    return (
            <form 
            className='todo-form'
            onSubmit={handleSubmit}
            onChange={inputChange}
            >
                <input 
                    placeholder = "Enter new task"
                    className = "New_Task"
                    value={text}
                    ref={inputRef}
                />
                <button className='todo-button'>Add</button>
            </form>
    );
}

export default TodoForm