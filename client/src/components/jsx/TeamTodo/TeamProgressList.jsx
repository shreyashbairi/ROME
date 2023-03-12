import React, {useState} from "react"

function TeamProgressList({started}) {
    return (
        <div>
            {started.map((todo,index)=>{
                return(
                    <div key = {index} class="task">
                        
                        <div key={todo.id} > 
                        {/* onClick={()=>completeTodo(todo.id)} was removed from above */}
                        <button style={{border:"none"}}>
                            {todo.title} {todo.date}
                            {/* {todo.date} */}
                            
                        </button>
                            
                            
                        </div>
                            
                        
                    </div>
                    
                )
            })}
        </div>
    )
}

export default TeamProgressList