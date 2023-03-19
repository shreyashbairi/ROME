import '../../css/Todo.css';
import { useState } from 'react';

function TodoForm(props) {
    const [text,setText] = useState(props.change ? props.change.value : '');
    const [description,setDescription] = useState(props.change ? props.change.value : '');
    const [repeating, setRepeating] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        // props.onSubmit({
        //     id: Math.floor(Math.random()*10000),
        //     text: text
        // });

        setText("");
        setDescription("");
    };

    const inputChange = (e) => {
        setText(e.target.value)
        console.log(text)
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value)
        console.log(description)
    }

    return (props.trigger) ? (
        <form 
        className='todo-form'
        onSubmit={handleSubmit}   
        >
            {props.change ? (
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
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={descriptionChange}
                />
                
                
                <button className='todo-button'>Add</button>
            </>
            }
            
        </form>
    ) : ""
}

export default TodoForm