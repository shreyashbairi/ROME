import React, {useState, useEffect} from 'react'
import TodoForm from './TeamTodoForm'
import TeamTodo from './TeamTodo'
import {AiFillPlusCircle} from 'react-icons/ai'
import TeamCompleteList from './TeamCompleteList';
import TeamProgressList from './TeamProgressList';
import "../../css/TeamHome.css"
import axios from 'axios';
import {BsFillTrashFill} from 'react-icons/bs'

export default function TeamTodoList(props) {

    const[teamMembers,setTeamMembers] = useState([]);

    const[started, setStarted] = useState([{
        title: String,
        description: String,
        date: Object,
        username: String,
        complete: Boolean,
        started:Boolean,
        workers: Array,
        teamID: Number,
        team: String
    }])

    const [click, setClick] = useState(false);

    const [todos, setTodos] = useState([{
        title: String,
        description: String,
        date: Object,
        username: String,
        complete: Boolean,
        started:Boolean,
        workers: Array,
        teamID: Number,
        team: String
    }])

    const [completes, setCompletes] = useState([{
        title: String,
        description: String,
        date: Object,
        username: String,
        complete: Boolean,
        started:Boolean,
        workers: Array,
        teamID: Number,
        team: String
    }])


    useEffect( () => {
        const team = localStorage.getItem('team');
        console.log(team);
        axios.get(`/teamTasks/${team}`)
        .then(res => {
            const tasksGrabed = res.data;
            console.log(tasksGrabed);
            loadTasks(tasksGrabed);
        })
        axios.get(`members/${team}`)
        .then(res => {
            const memberList = res.data;
            console.log(memberList);
            setTeamMembers(memberList);
        })
    },[])

    function loadTasks(tasksGrabed) {
        let completes = [];
        let started = [];
        let todos = [];

        tasksGrabed.forEach((element)=> {
            if (element.complete === true) {
                completes.push(element);
            } else if (element.started === true) {
                started.push(element);
            } else {
                todos.push(element);
            }
        });

        setCompletes(completes);
        setStarted(started);
        setTodos(todos);
    }


    const addTodo = todo => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
            setClick(false);
            return;
        }

        const newTask = [todo, ...todos]
        setTodos(newTask)
        setClick(false)
        console.log(todo)
    }

    async function removeTodo(todo) {
        completeTodo(todo.id)
        console.log(todo.id)
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
        setTodos(prev=>prev.map(item=>(item.id===id ? newValue : item)))
    }

    const completeTodo = id => {
        todos.map(todo=>{
            if(todo.id===id){
                todo.isComplete = !todo.isComplete
                const newcomps = [todo,...completes]
                setCompletes(newcomps)
            }
            return todo
        })
        
    }

    const completeTodoProgs = id => {
        started.map(todo=>{
            if(todo.id===id){
                todo.isComplete = !todo.isComplete
                const newcomps = [todo,...completes]
                setCompletes(newcomps)
            }
            return todo
        })
        
    }

    const clicked = e => {
        setClick(true)
        console.log(click)
    }

    async function deleteArchive() {
        console.log("hi");

        try {
            await axios.delete('/teamtaskdelete', {});
        } catch (e) {
            alert("Team Tasks didn't delete properly")
        }
        console.log("check db");
        
    }

    async function newWorker(task, memberUserName) {
        const exists = teamMembers.some((member) => member === memberUserName)

        if (!exists) {
            alert("This username does not exist in this team");
        } else {

            try {
                await axios.post('/assignMemberToTask', {
                    team: localStorage.getItem("team"),
                    task: task,
                    member:memberUserName
                });
            } catch (e) {
                alert("Member could not be added at this time")
            }

        }
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
            teamMembers={teamMembers}
        />

        <br></br>
        <h4>Complete Todos
            <BsFillTrashFill onClick={deleteArchive}/>
        </h4>
        <TeamCompleteList
            completes={completes}
        />
        
    </div>
  )
}