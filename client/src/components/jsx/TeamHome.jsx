import TodoList from "./Todo/TodoList"
import "../css/TeamHome.css"
import Popup from "reactjs-popup"
import UpdateTask from "./UpdateTask"
import AddEvent from "./Calendar/AddEvent"
import { useState } from "react"
import TeamTodoList from "./TeamTodo/TeamTodoList"
import AddTeamMember from "./AddTeamMember"
function TeamHome() {
    const [show, setButtonPop] = useState(false);
    const [addTeam, setAddTeam] = useState(false);
    const closeAdd = () => {
        setAddTeam(false);
    }

    const openAdd = () => {
        setAddTeam(true);
    }

    // alert("You are entering as a manager");
    const closeform = () => {
        setButtonPop(false);
    }

    const openform = () => {
        setButtonPop(true);
    }
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );
    return (
        <div >
        <div class="todobefore"> 
            <div className="top bg-primary">
                Current Tasks
            </div>
            
            {/* <Popup class="updatetask" trigger={<button type="button" class="btn btn-secondary"> {'>'} </button>} open={show}
                        onOpen={openform} position="right center" nested modal>
                            <div class="card">
                            <UpdateTask
                                    trigger={show}
                                    setTrigger={closeform}
                                />     
                            </div>
            </ Popup> */}
            <TeamTodoList />
        </div> 
        {/* <div class="todoprogress"> 
            <div className="top bg-primary">
                In Progress
            </div>


        </div>  */}
        {/* <div class="todocomplete"> 
            <div className="top bg-primary">
                Completed
            </div>


        </div>  */}

        <div class="members">
            <div className="top bg-primary">
                members
                <Popup class="addevent" trigger={<button type="button" class="btn btn-secondary">  </button>} open={addTeam}
                        onOpen={openAdd} position="right center" nested modal>
                            <div class="card">
                            <AddTeamMember 
                                    trigger={AddEvent}
                                    setTrigger={closeAdd}
                                    // scheduleEvent={this.scheduleEvent}
                                />     
                            </div>
            </ Popup>
            </div>


            <div class="row mt-2">
                <div class="col-sm-3">
                    <h class="mb-0">Name</h>
                </div>
                <div class="col-sm-9 text-secondary">
                    email                      
                </div>
            </div>
            <ColoredLine color="grey" />


            {/* <div class="col-sm-3 mt-2">
                <h class="mb-0">Name     Email</h>

            </div> */}



        </div>
        <div class="teamchat">
            <div className="top bg-primary">
                chat
            </div>
        </div>
        

    </div> 
        // <div>
        //     <div class="team1"> 
        //         {/* make a different component than TodoList bc this one has some additional functionality
        //         other code can still be used for reference.  It's just easier to make new
        //         for now we just need the spaces for it */}
        //     </div>
        //     <div className="in-progress-container">

        //     </div>
        //     <div className="complete-list">
        //         {/* Note: things here need to be deletable so they don't pile up too much */}
        //     </div>
        //     <div className="announcements">

        //     </div>
        //     <div className="group-chat">

        //     </div>
        // </div>
        //sidebar
        //group todo
        //in progress
        //completed todos
        //team chat area
    )
}

export default TeamHome