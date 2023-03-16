import React, {useState, useEffect} from 'react'
import TodoForm from './TeamTodoForm'
import TeamTodo from './TeamTodo'
import {AiFillPlusCircle} from 'react-icons/ai'
import TeamCompleteList from './TeamCompleteList';
import TeamProgressList from './TeamProgressList';
import "../../css/TeamHome.css"
import axios from 'axios';

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
    // const [inProgs, setInProgs] = useState([{
    //     title:String,
    //     description:String,
    //     date:Object
    // }])
    const [completes, setCompletes] = useState([{
        title:String,
        description:String,
        date:Object
    }])
    // useEffect( () => {
    //     setTodos([{
    //         title:String,
    //         description:String,
    //         date:Object,
    //         workers:Array
    //     }]);
    // }, [] )


    useEffect( () => {
        const team = localStorage.getItem('team');
        console.log(team);
        axios.get(`/teamTasks/${team}`)
        .then(res => {
            const tasksGrabed = res.data;
            // console.log(tasksGrabed);
            var i;
            var task;
            setCompletes([])
            setStarted([])
            setTodos([])
            for (i=0;i<tasksGrabed.length;i++) {
                task=tasksGrabed[i];
                if (task.complete === true) {
                    setCompletes([task,...completes]);
                    setStarted([...started]);
                    setTodos([...todos]);
                } else if (task.started === true) {
                    setStarted([task,...started]);
                    setCompletes([...completes]);
                    setTodos([...todos]);
                } else {
                    setTodos([task,...todos]);
                    setStarted([...started]);
                    setCompletes([...completes]);
                }
            }
            // setTodos(tasksGrabed);
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

    async function removeTodo(todo) {
        completeTodo(todo.id)
        console.log(todo.id)
        // console.log(completes)
        const removeArray = [...todos].filter(todoCheck => todoCheck.id !== todo.id)

        try {
            await axios.post('/teamtaskedit', {
                title:todo.title,
                description:todo.description,
                date:todo.date,
                started:false,
                complete:true
                
            });
        } catch (e) {
            alert("Team Task did not Update")
        }
        
        setTodos(removeArray)
    }

    async function removeTodoFromProg(todo) {
        completeTodoProgs(todo.id)
        // console.log(completes)
        console.log("in remove")
        console.log(todo.id)
        console.log(started)
        const removeArray = [...started].filter(todoCheck => todoCheck.id !== todo.id)

        try {
            await axios.post('/teamtaskedit', {
                title:todo.title,
                description:todo.description,
                date:todo.date,
                started:false,
                complete:true
                
            });
        } catch (e) {
            alert("Team Task did not Update")
        }
        
        setStarted(removeArray)
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

    const completeTodoProgs = id => {
        // console.log("in completes")
        started.map(todo=>{
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
            setStarted={setStarted}
            removeTodoFromProg={removeTodoFromProg}
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