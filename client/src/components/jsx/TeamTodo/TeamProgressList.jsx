import React, {useState} from "react"
import  { AiFillCloseCircle } from 'react-icons/ai'

function TeamProgressList({started,removeTodoFromProg}) {
    return (
        <div>
            {started.map((todo,index)=>{
                return(
                    <div key = {index} class="task">
                        
                        <div key={todo.id} > 
                        <button style={{border:"none"}}>
                            {todo.title} {todo.date}
                        </button>
                            
                            
                        </div>

                        <AiFillCloseCircle 
                            onClick={()=>removeTodoFromProg(todo.id)}
                        />
                            
                        
                    </div>
                    
                )
            })}
        </div>
    )
}

export default TeamProgressList