import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm1'
import Todo from './Todo'
import {AiFillPlusCircle , AiFillFilter} from 'react-icons/ai'
import axios from 'axios'
import Popup from "reactjs-popup";



function TodoList(props) {
    // const [todos,setTodos] = useState([]);
    const [click, setClick] = useState(false);
    const [todos, setTodos] = useState([{
        title:String,
        description:String,
        date:Object
    }])
    const [seven, setSeven] = useState(false);
    const [ascending, setAscending] = useState(false);
    const [pastDue, setPastDue] = useState(false);

    useEffect( () => {
        console.clear();
        const username = localStorage.getItem('userid');
        axios.get(`/tasks/${username}`)
        .then(res => {
            const tasksGrabed = res.data;
            tasksGrabed.sort((a,b)=> (a.date<b.date) ? -1 : 1);
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
        newTask.sort((a,b)=> (a.date<b.date) ? -1 : 1);
        setTodos(newTask)
        setClick(false)
    }

    async function removeTodo(task) {
        // const toDel = [...todos].filter(todo=>todo.id === task.id);
        const removeArray = [...todos].filter(todo => todo.id !== task.id)
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
            return todo
        })
        setTodos(updatedTodos)
    }

    const clicked = e => {
        setClick(true)
    }

    function processFilters(pastDue, seven, ascending, descending) {
        console.log("entered");
        console.log(pastDue);
        console.log(seven);
        console.log(ascending);
        console.log(descending);
    }

  return (
    <div id="container">

        <h1 id='header'>
            Your Tasks

            <Popup trigger={  <button type="button" class="btn  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <AiFillFilter/>
                    </button>  }  >
                <div className="card-header">
                    <p className="title">Filter</p>
                </div>
                <form 
                    class="focus-body"
                    onSubmit={processFilters(pastDue, seven, ascending)}
                >
                    {/* {teamBoxes.map((item, index) => {
                        return ( */}
                        <div className="checkbox-container">
                            <input
                            type="checkbox"
                            name="teams"
                            // value={}
                            onChange={()=>setPastDue(!pastDue)}
                            />
                            <label style={{}}>Past Due</label>
                        </div>
                        <div className="checkbox-container">
                            <input
                            type="checkbox"
                            name="teams"
                            // value={}
                            onChange={()=>setSeven(!seven)}
                            />
                            <label style={{}}>Next 7 Days</label>
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
            seven={seven}
            ascending={ascending}
            pastDue={pastDue}
            setTodos={setTodos}

        />
        
    </div>
  )
}

export default TodoList