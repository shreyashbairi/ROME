import React, {useState} from "react"
import  { AiFillCloseCircle } from 'react-icons/ai'

function TeamProgressList({started,setStarted,removeTodoFromProg}) {

    function newWorker(todo,event) {
        todo.workers=[event.target.value,...todo.workers];
    }

    return (
        <div>
            {started.map((todo,index)=>{
                return(
                    <div key = {index} class="task">
                        
                        <div key={todo.id} > 
                        <button style={{border:"none"}}>
                            {todo.title} {todo.date}
                            <br/>
                            Currently Working: 
                            <br/>
                            <form
                                // onSubmit={()=>newWorker(todo)}
                            >
                                <select 
                                    // value={this.state.value}
                                >
                                    <option value="none">Make a Selection</option>
                                    <option value="Sample Worker">Sample Worker</option>
                                </select>
                            </form>
                        </button>
                            
                            
                        </div>

                        <AiFillCloseCircle 
                            onClick={()=>removeTodoFromProg(todo)}
                        />
                            
                        
                    </div>
                    
                )
            })}
        </div>
    )
}

export default TeamProgressList