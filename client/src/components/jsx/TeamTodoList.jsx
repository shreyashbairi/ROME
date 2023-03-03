import React, {useState} from 'react'
import TodoForm from './TeamTodoForm'
import TeamTodo from './TeamTodo'
import {AiFillPlusCircle} from 'react-icons/ai'
import TeamCompleteList from './TeamCompleteList';
import TeamProgressList from './TeamProgressList';

var complete =[];



// TODO
// Comment everything
// create a button that makes a pop up interface with 2 text boxes (description and name), drop down for personal and team
// have each task have down arrow that allows view of details
// create button to add team
// create UI pop up for team name
// have submit direct to a different page
// have team added to DB under user


export default function TeamTodoList(props) {
    // const [todos,setTodos] = useState([]);
    const [click, setClick] = useState(false);
    const [todos, setTodos] = useState([{
        title:String,
        description:String,
        date:Object
    }])
    const [inProgs, setInProgs] = useState([{
        title:String,
        description:String,
        date:Object
    }])
    const [completes, setCompletes] = useState([{
        title:String,
        description:String,
        date:Object
    }])

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
        completeTodo(id)
        // console.log(completes)
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
        todos.map(todo=>{
            if(todo.id===id){
                todo.isComplete = !todo.isComplete
                const newcomps = [todo,...completes]
                // complete = [todo,...complete]
                // myComplete(complete)
                setCompletes(newcomps)
            }
            // console.log(todo)
            return todo
        })
        
    }

    // const progs = id => {
    //     todos.map(todo=>{
    //         if(todo.id===id){
    //             const newcomps = [todo,...inProgs]
    //             // complete = [todo,...complete]
    //             // myComplete(complete)
    //             setInProgs(newcomps)
    //         }
    //         // console.log(todo)
    //         return todo
    //     })
        
    // }


    const clicked = e => {
        setClick(true)
        console.log(click)
    }

  return (
    <div id="container">

        <h4 class="task-add-button">In Progress<AiFillPlusCircle onClick={clicked}/></h4>

        <TodoForm 
            onSubmit={addTodo}
            trigger={click}
            setTrigger={()=>setClick(false)}
        />
        <TeamTodo 
            // todos={todos}
            todos={todos}
            removeTodo={removeTodo}
            editTask={editTask}
            // progs={progs}
        />

        {/* In Progress
        <TeamProgressList inProgs={inProgs}/> */}
        <br></br>
        <h4>Complete Todos</h4>
        <TeamCompleteList
            completes={completes}
        />
        
    </div>
  )
}

function myComplete(complete) {
    this.complete = complete;
}

export function completeExport() {
    return complete;
}