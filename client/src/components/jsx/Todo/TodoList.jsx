import React, {useState} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'


function TodoList() {
    const [todos,setTodos] = useState([]);

    const addTask = todo => {
        // console.log("test1")
        if (!todo.text || /^\s*$/.test(todo.test)) {
            return;
        }

        const newTasks = [todo, ...todos]
        setTodos(newTasks)
        // console.log(...todos)
    }

    const removeTodo = id => {
        const removeArray = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArray)
    }

    const editTask = (id, newValue) => {
    
        if (!newValue.text || /^\s*$/.test(newValue.test)) {
            return;
        }

        setTodos(prev=>prev.map(item=>(item.id===id ? newValue : item)))
    }

    const completeTodo = id => {
        let updatedTodos=todos.map(todo=>{
            if(todo.id===id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
    }

  return (
    <div id="container">

        <h1 id='header'>
            Your Tasks
        </h1>

        <TodoForm 
            onSubmit={addTask}
        />
        <Todo 
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            editTask={editTask}
        />
        
    </div>
  )
}

export default TodoList