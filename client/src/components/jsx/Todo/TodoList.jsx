import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm1'
import Todo from './Todo'
import {AiFillPlusCircle} from 'react-icons/ai'
import axios from 'axios'

// TODO
// Comment everything
// create a button that makes a pop up interface with 2 text boxes (description and name), drop down for personal and team
// have each task have down arrow that allows view of details
// create button to add team
// create UI pop up for team name
// have submit direct to a different page
// have team added to DB under user

function TodoList(props) {
    // const [todos,setTodos] = useState([]);
    const [click, setClick] = useState(false);
    const [todos, setTodos] = useState([{
        title:String,
        description:String,
        date:Object
    }])

    useEffect( () => {
        const username = localStorage.getItem('userid');
        axios.get(`/tasks/${username}`)
        .then(res => {
            const tasksGrabed = res.data;
            console.log(tasksGrabed);
            setTodos(tasksGrabed);
        })
    }, [])

    const addTodo = todo => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
            setClick(false);
            return;
        }

        // const newTasks = [todo, ...todos]
        // setTodos(newTasks)
        const newTask = [todo, ...todos]
        setTodos(newTask)
        setClick(false)
        console.log(todo)
    }

    const removeTodo = id => {
        console.log([...todos])
        const removeArray = [...todos].filter(todo => todo.id !== id)
        
        setTodos(removeArray)
    }

    const editTask = (id, newValue) => {
    
        // if (!newValue.text || /^\s*$/.test(newValue.test)) {
        //     return;
        // }

        setTodos(prev=>prev.map(item=>(item.id===id ? newValue : item)))
    }

    const completeTodo = id => {
        let updatedTodos=todos.map(todo=>{
            if(todo.id===id){
                todo.isComplete = !todo.isComplete
            }
            console.log(todo)
            return todo
        })
        setTodos(updatedTodos)
    }

    const clicked = e => {
        setClick(true)
        console.log(click)
    }

  return (
    <div id="container">

        <h1 id='header'>
            Your Tasks
            
        </h1>
        <h3 class="task-add-button"><AiFillPlusCircle onClick={clicked}/></h3>

        <TodoForm 
            onSubmit={addTodo}
            trigger={click}
            setTrigger={()=>setClick(false)}
        />
        <Todo 
            // todos={todos}
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            editTask={editTask}
        />
        
    </div>
  )
}

export default TodoList