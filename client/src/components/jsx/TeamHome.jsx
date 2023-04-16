import "../css/TeamHome.css"
import Popup from "reactjs-popup"
import AddEvent from "./Calendar/AddEvent"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./UserContext"
import TeamTodoList from "./Todo/TeamTodo/TeamTodoList"
import AddTeamMember from "./AddTeamMember"
import RemoveTeamMember from "./RemoveTeamMember"
import TeamCalendar from "./Calendar/TeamCalendar"
import { TeamContext } from "./DefaultLayout"
import TeamMemberCalendar from "./Calendar/TeamMemberCalendar"
import axios from "axios"
import CreateAnnoucements from "./CreateAnnoucements"
import { RxCross2 } from "react-icons/rx";



function TeamHome() {
    const teamname = useContext(TeamContext);
    const [show, setButtonPop] = useState(false);
    const {user} = useContext(UserContext);
    const [addTeam, setAddTeam] = useState(false);
    const [removeTeam, setRemoveTeam] = useState(false);
    const [bodyView, setBodyView] = useState(0);
    const [bodyViewName, setBodyViewName] = useState("Todo");
    const [managerBool, setManagerBool] = useState(false);
    const [color,setColor] = useState('');
    const [memberName, setMemberName] = useState();
    const [announcePop, setAnnoucePop] = useState(false);
    const [members, setMembers] = useState([{
        userFullname: String,
        userEmail: String,
        userUserName: String,
    }
    ]);
    const [announcements, setAnnoucements] = useState([{
        _id: String,
        title: String,
        description: String,
        teamName: String,
    }
    ]);
    useEffect(() => {
        const username = user.userUserName;
        
        axios.get(`getmanager/${teamname}`)
        .then(res => {
            const manager = res.data;
            const managername = manager.userUserName;
            if (managername === username) {
                setManagerBool(true);
            } else {
                setManagerBool(false);

            }
        })
        axios.get(`members/${teamname}`)
        .then(res => {
            const mem = res.data;
            //console.log(res.data);
            setMembers(mem);
        })
        axios.get(`announcements/${teamname}`)
        .then(res => {
            const announ = res.data;
            console.log(announ);
            setAnnoucements(announ);
        })
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        })
    }, [])

    async function deleteannoncement(pro){
        let id = pro._id;
        let teamname = localStorage.getItem('team');

        axios.delete(`/deleteannoucements/${id}`,{});
        axios.get(`announcements/${teamname}`)
        .then(res => {
            const announ = res.data;
            console.log(announ);
            setAnnoucements(announ);
        })
      };
    
    const closeAdd = () => {
        setAddTeam(false);
    }

    const openAdd = () => {
        setAddTeam(true);
    }

    const closeRemove = () => {
        setRemoveTeam(false);
    }

    const openRemove = () => {
        setRemoveTeam(true);
    }

    const closeAnnouce = () => {
        setAnnoucePop(false);
    }

    const openAnnouce = () => {
        setAnnoucePop(true);
    }

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

    const memberCalendar = (member) => {
        const username = user.userUserName;
        if (managerBool && member.userUserName != username) {
            changePersonalCalendar(member.userFullname);
            setMemberName(member.userUserName);
        }

    }
    
    const changePersonalCalendar = (fullName) => {
        setBodyView(3);
        setBodyViewName(`${fullName}'s Calendar`);
    }


    const changeBody = () => {
        if (bodyView == 0 && managerBool) {
            setBodyView(1);
            setBodyViewName("Team Calendar");
        } else if (managerBool) {
            setBodyView(0);
            setBodyViewName("Todo");
        }
    }

    let teamBody;
    if (bodyView === 0) {
        teamBody = <TeamTodoList />
    } else if (bodyView === 1 && managerBool) {
        teamBody = <TeamCalendar />
        // teamBody = <TeamMemberCalendar />
    } else if (managerBool) {
        teamBody = <TeamMemberCalendar
                        username={memberName}
                   />
    }
    return (
        <div >
        <div class="todobefore"> 
            <div style={{backgroundColor: color}} className="top">
                {/* Current Tasks */}
                <button type="button" class="btn btn-secondary" onClick={changeBody}>{bodyViewName}</button>
                {/* TODO ^^^make only display for managers */}
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
            <div class="team-body">
            {teamBody}
            </div>
            {/* <TeamTodoList /> */}
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

     //opens the popup that is in addteammembers
        </div>  */}
   
        <div class="members">
            <div style={{backgroundColor: color}} className="top">   
                {managerBool ?                 
                <Popup class="addevent" trigger={<button type="button" show={managerBool} class="btn btn-secondary"></button>} open={addTeam}
                        onOpen={openAdd} position="right center" nested modal>
                            <div class="card">
                            {user !== null && user.userTeamList.length > 0 && (
  <AddTeamMember
    trigger={AddEvent}
    setTrigger={closeAdd}
    // scheduleEvent={this.scheduleEvent}
  />
)}
                            </div>
                </ Popup>
                  : null}
                members
                {managerBool ?                 
                <Popup class="addevent" trigger={<button type="button" show={managerBool} class="btn btn-secondary"></button>} open={removeTeam}
                        onOpen={openRemove} position="right center" nested modal>
                            <div class="card">
                            <RemoveTeamMember 
                                    trigger={AddEvent}
                                    setTrigger={closeRemove}
                                    // scheduleEvent={this.scheduleEvent}

                                />     
                            </div>
                </ Popup>
                  : null}

                
            </div>
            {members.map((member,index)=>{
                    return (
                        <div key={index}>
                                <div class="row mt-2">
                                    <div class="col-sm-3">
                                        <h class="mb-0" onClick={() => memberCalendar(member)}>{member.userFullname}</h>
                                    </div>
                                    <div class="col-sm-9 text-secondary" onClick={() => memberCalendar(member)}>
                                        {member.userEmail}                  
                                    </div>
                                </div>
                                <ColoredLine color="grey" />
                        </div>
                    )
                })} 



            {/* <div class="col-sm-3 mt-2">
                <h class="mb-0">Name     Email</h>

            </div> */}



        </div>
        <div class="teamchat">
            <div style={{backgroundColor: color}} className="top">
                Announcement
                {managerBool ?                 
                <Popup class="addevent" trigger={<button type="button" show={managerBool} class="btn btn-secondary">Add</button>} open={announcePop}
                        onOpen={openAnnouce} position="right center" nested modal>
                            <div class="card">
                            <CreateAnnoucements
                                    trigger={AddEvent}
                                    setTrigger={closeAnnouce}
                                    // scheduleEvent={this.scheduleEvent}

                                />     
                            </div>
                </ Popup>
                  : null}
            </div>
            {announcements.map((annou,index)=>{
                    return (
                        <div key={index}>
                            {managerBool ? 
                            <button type="button" class="delete" onClick={()=> deleteannoncement(annou)} > <RxCross2/> </button>
                            : null
                            }
                            <div>
                                {annou.title} 
                            </div>
                            {annou.description}
                            <ColoredLine color="grey" />
                        </div>
                    )
                })} 
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