import '../../css/Todo.css';
import React, { useState,useEffect,useRef } from 'react';

export function TodoForm(props1,props2) {
    const [text,setText] = useState(props1.change ? props1.change.value : '');
    const [description, setDesc] = useState('');
    // const inputRef = useRef(null);
    // const descriptionRef = useRef(null);

    // useEffect(()=>{
    //     inputRef.current.focus()
    // })

    const handleSubmit = e => {
        e.preventDefault();

        props1.onSubmit({
            id: Math.floor(Math.random()*10000),
            text: text
        });

        setText("");
        setDesc("");
    };

    const inputChange = (e) => {
        setText(e.target.value)
    }

    const descriptionChange=(e)=> {
        setDesc(e.target.value)
    }


    return (
            <form 
            className='todo-form'
            onSubmit={handleSubmit}
            
            >
                {props1.change ? (
                    <>
                        <input 
                            placeholder = {text}
                            className = "New_Task"
                            value={text}
                            // ref={inputRef}
                            onChange={inputChange}
                        />
                        <button className='todo-button'>Update</button>
                    </>
                ) : 
                <>
                    <input 
                        placeholder = "Enter new task"
                        className = "New_Task"
                        value={text}
                        // ref={inputRef}
                        onChange={inputChange}
                    />
                    <input
                        placeholder='Description'
                        className='Task_Description'
                        onChange={descriptionChange}
                        value={description}
                        // ref={descriptionRef}
                    />
                    
                    <button className='todo-button'>Add</button>
                </>
                }
                
            </form>
    );
}

export default TodoForm