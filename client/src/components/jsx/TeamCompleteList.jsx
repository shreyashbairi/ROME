import React from "react"
import { useState } from "react"
// import {completes, TeamTodoList} from "./TeamTodoList"
// import exportTeamTodoList from "./TeamTodoList";
// import { completeComponent } from "./TeamTodoList"
// import { completeExport } from "./TeamTodoList"

export default function TeamCompleteList({completes}) {
    
    return (
        <div>
            {completes.map((todo,index)=>{
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

// export const completes = TeamCompleteList();