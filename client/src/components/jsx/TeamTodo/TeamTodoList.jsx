import React, {useState, useEffect} from 'react'
import TodoForm from './TeamTodoForm'
import TeamTodo from './TeamTodo'
import {AiFillPlusCircle} from 'react-icons/ai'
import TeamCompleteList from './TeamCompleteList';
import TeamProgressList from './TeamProgressList';
import "../../css/TeamHome.css"

var complete =[];

export default function TeamTodoList(props) {
    // const [todos,setTodos] = useState([]);
    const[started, setStarted] = useState([{
        title:String,
        description:String,
        date:Date
    }])
    const [click, setClick] = useState(false);
    const [todos, setTodos] = useState([{
        title:String,
        description:String,
        date:Date
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
    useEffect( () => {
        setTodos([{
            title:String,
            description:String,
            date:Object
        }]);
    }, [] )

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

        <h4>Not Started<AiFillPlusCircle onClick={clicked}/></h4>

        <TodoForm 
            onSubmit={addTodo}
            trigger={click}
            setTrigger={()=>setClick(false)}
        />
        <TeamTodo 
            todos={todos}
            removeTodo={removeTodo}
            editTask={editTask}
            started={started}
            setStarted={setStarted}
            setTodos={setTodos}
        />

        <br></br>
        <h4>In Progress</h4>

        <TeamProgressList
            started={started}
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