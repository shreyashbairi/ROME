import React, {useState,useEffect} from "react"
import  { AiFillCloseCircle } from 'react-icons/ai'
import TeamAddNewWorking from './TeamAddNewWorking'
import Popup from "reactjs-popup";
import axios from 'axios';

function TeamProgressList({started,setStarted,removeTodoFromProg}) {

    const[teamMembers,setTeamMembers] = useState([]);
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        // props.setTrigger(false);
        setName("");
    }

    useEffect( () => {
        const team = localStorage.getItem('team');
        axios.get(`members/${team}`)
        .then(res => {
            const memberList = res.data;
            setTeamMembers(memberList);
        })
    },[])

    async function newWorker(memberUserName, task) {

        const exists = teamMembers.some((member) => member.userUserName === memberUserName);

        if (!exists) {
            alert("This username does not exist in this team");
        } 
        else {

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
        <div>
            {started.map((todo,index)=>{
                return(
                    <div key = {index} class="task">
                        
                        <div key={todo.id} > 
                        <button style={{border:"none"}}>
                            {todo.title} {todo.date}
                        </button>
                        <br></br>
                            
                        <Popup class="detailedTask" trigger={<button>Add New Working Member</button>} nested modal>

                            <div className="card-body">

                                <h3>Add Worker</h3>
                                <form 
                                    id="new-team-form"
                                    onSubmit={handleSubmit}
                                > 
                                    <div class="col-sm-9 text-secondary mt-5">
                                        <input
                                            id="team"
                                            placeholder="username"
                                            type="text"
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                        />
                                    </div>
                                    <button onClick={()=>newWorker(name, todo)}>Add</button> 

                                </form>

                                
                            </div>

                        </ Popup>

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