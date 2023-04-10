import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../UserContext'
import TodoForm from './TodoForm1'
import Todo from './Todo'
import {AiFillPlusCircle , AiFillFilter} from 'react-icons/ai'
import axios from 'axios'
import Popup from "reactjs-popup";



function TodoList(props) {
    // const [todos,setTodos] = useState([]);
    const [click, setClick] = useState(false);
    const [color,setColor] = useState("");
    const {user, setUser} = useContext(UserContext);
    const [todos, setTodos] = useState([{
        title:String,
        description:String,
        date:Date
    }])
    const [filters, setFilters] = useState({
        seven: false,
        pastDue: false,
        bypriority: false
    })

    useEffect( () => {
        //console.clear();
        // const username = user.userUsername;
        // console.log(user.userUserName);
        // const username = localStorage.getItem('userId');
        const username=user.userUserName;
        axios.get(`/tasks/${username}`)
        .then(res => {
            const tasksGrabed = res.data;
            tasksGrabed.sort((a,b)=> (a.date<b.date) ? -1 : 1);
            setTodos(tasksGrabed);
        })
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
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
        newTask.sort((a,b)=> (a.date<b.date) ? -1 : 1);
        setTodos(newTask)
        setClick(false)
    }

    async function removeTodo(task) {
        // const toDel = [...todos].filter(todo=>todo.id === task.id);
        // const removeArray = [...todos].filter(todo => todo.id !== task.id)
        // setTodos(removeArray);
        // console.log(task.title);
        try {
            await axios.delete(`/personaltaskdelete/${task.title}/${localStorage.getItem('userId')}`, {});
            alert("Task deleted")
        } catch (e) {
            alert("Team Tasks didn't delete properly")
        }
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
            return todo
        })
        setTodos(updatedTodos)
    }

    const clicked = e => {
        setClick(true)
    }

    function processFilters(pastDue, seven, ascending, descending) {
    }

  return (
    <div  id="container">

        <h1 style={{backgroundColor: color}} id='header'>
            Your Tasks

            <Popup trigger={  <button type="button" class="btn  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <AiFillFilter/>
                    </button>  }  >
                <div className="card-header">
                    <p className="title">Filter</p>
                </div>
                <form 
                    class="focus-body"
                    onSubmit={processFilters(filters.pastDue, filters.seven)}
                >
                    {/* {teamBoxes.map((item, index) => {
                        return ( */}
                        <div className="checkbox-container">
                            <input
                            type="radio"
                            name="teams"
                            // value={}
                            onChange={()=>setFilters({pastDue:true, seven:false, bypriority:false})}
                            />
                            <label style={{}}>Past Due</label>
                        </div>
                        <div className="checkbox-container">
                            <input
                            type="radio"
                            name="teams"
                            // value={}
                            onChange={()=>setFilters({pastDue:false,seven:true,bypriority:false})}
                            />
                            <label style={{}}>Next 7 Days</label>
                        </div>
                        <div className="checkbox-container">
                            <input
                            type="radio"
                            name="teams"
                            // value={}
                            onChange={()=>setFilters({pastDue:false,seven:false,bypriority:true})}
                            />
                            <label style={{}}>Decreasing Priority</label>
                        </div>
                        <div className="checkbox-container">
                            <input
                            type="radio"
                            name="teams"
                            // value={}
                            onChange={()=>setFilters({pastDue:false,seven:false,bypriority:false})}
                            />
                            <label style={{}}>None</label>
                        </div>
                        {/* );
                    })} */}
                </form>                    
            </ Popup>
            
        </h1>
        
        <h3 class="task-add-button"><AiFillPlusCircle onClick={clicked}/></h3>

        <TodoForm 
            onSubmit={addTodo}
            trigger={click}
            setTrigger={()=>setClick(false)}
        />
        <Todo 
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            editTask={editTask}
            seven={filters.seven}
            pastDue={filters.pastDue}
            bypriority={filters.bypriority}
            setTodos={setTodos}

        />
        
    </div>
  )
}

export default TodoList