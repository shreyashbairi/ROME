import React, {useState} from 'react'
import TodoForm from './TodoForm'
import '../../css/Todo.css'

function TodoList() {
    const [todos,setTodos] = useState([]);

    const addTask = todo => {
        console.log("test1")
        if (!todo.text || /^\s*$/.test(todo.test)) {
            return;
        }

        const newTasks = [todo, ...todos]
        setTodos(newTasks)
        // console.log(...todos)
    }

  return (
    <div id="container">

        <h1 id='header'>
            Your Tasks
        </h1>

        <TodoForm 
            onSubmit={addTask}
        />
        
    </div>
  )
}

export default TodoList