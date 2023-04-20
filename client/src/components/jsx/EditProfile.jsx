import React, {useState, useContext} from "react";
import {UserContext} from './UserContext';
import '../css/Profile.css';
import axios from "axios";
import { BsWindowSidebar } from "react-icons/bs";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
//import Select from 'react-select'


function EditProfile (){
  const [userProfile, setProfile] = useState({});
  const [cbirthday, setcBirthday] = useState("")
  const [cphone, setcPhone] = useState("")
  const [caddress, setcAddress] = useState("")
  const [cnotification, setcNotification] = useState("")
  const [redirect, setRedirect] = useState(false);
  const [cColor, setColor] =useState("");
  const [color,setcolor] = useState("");
  const {user, setUser} = useContext(UserContext);
  const [join, setJoin] = useState(false);
  const [poke, setPoke] = useState(false);
  const [task, setTask] = useState(false);
  const [leave, setLeave] = useState(false);
  const [announce, setAnnounce] = useState(false);


  useEffect( () => {
    const username = user.userUserName;
    axios.get(`/profile/${username}`)
    .then(res => {
      setProfile(res.data);
    })
    axios.get(`/color/${username}`)
    .then (res => {
        setcolor(res.data);
        setColor(res.data);
    })
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const username = user.userUserName;
    try {
      axios.post('/editprofile', {
        username,
        cbirthday,
        cphone,
        caddress,
        cnotification,
        cColor,
        join,
        poke,
        task,
        leave,
        announce,
      });
      
      setRedirect(true);
    } catch (e) {
      alert("Profile Update Failed")
    }


}

const handlejoin = (event) => {
  if(event.target.value === "join"){
    setJoin(event.target.checked);
  } else if(event.target.value === "poke"){
    setPoke(event.target.checked);
  } else if(event.target.value === "task"){
    setTask(event.target.checked);
  } else if(event.target.value === "leave"){
    setLeave(event.target.checked);
  } else if(event.target.value === "announce"){
    setAnnounce(event.target.checked);
  }

}
if (redirect) {
  return <Navigate to={'/profile'}/>
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
      <div class="container">
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center ">
                    <div class="mt-4">
                      <button class="pic btn-default" type = "submit">
                        <img src="https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=w240-h480-rw" alt="Logo" width="100" height="100" class="rounded mx-auto d-block center" />      
                      </button>

                      <h1>{userProfile.userFullname}</h1>  
                      <p class="text-secondary mb-1">{userProfile.userEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="card mt-3">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span class="text-secondary">website.com</span>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span class="text-secondary">@twitter</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span class="text-secondary">instgram</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span class="text-secondary">facebook</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <form 
                      id="editprofile"
                      onSubmit={handleSubmit}
                  >
                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Birthday</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          
                        <input
                            id="birthday"
                            type="date"
                            onChange={e => setcBirthday(e.target.value)}
                            value={cbirthday}
                        />                
                        </div>
                      </div>
                      <ColoredLine color="grey" />
                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Preferred name</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <textarea
                          id="text"
                          placeholder="Preferred name"
                          onChange={e => setcPhone(e.target.value)}
                          value={cphone}
                      />
                      </div>
                      </div>
                      <ColoredLine color="grey" />

      

                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Pronouns</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                        <textarea
                          id="address"
                          placeholder="Pronous"
                          type="text"
                          className="description-box"
                          onChange={e => setcAddress(e.target.value)}
                          value={caddress}
                      />                
                        </div>
                      </div>
                      <ColoredLine color="grey" />


   
             
                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Theme</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                        <input type="color" id="head" name="head"
                        value={color} 
                        onChange={e =>{ setColor(e.target.value); setcolor(e.target.value)}} />
                        </div>
                      </div>
                      <ColoredLine color="grey" />
                      

                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Notification</h>
                        </div>
                        
                        <div class="col-sm-9 text-secondary">
                          <div>
                            Join message
                            <input type="checkbox" 
                            
                              onChange={handlejoin}
                              checked={join}
                              value="join"
                              />
                          </div>
                          <div>
                            Poke
                            <input type="checkbox" 
                            
                            onChange={handlejoin}
                            checked={poke}
                            value="poke"
                            />

                          </div>
                          <div>
                            Task reminder
                            <input type="checkbox" 
                            
                            onChange={handlejoin}
                            checked={task}
                            value="task"
                            />
                          </div>
                          <div>
                            Leave 
                            <input type="checkbox" 
                            
                            onChange={handlejoin}
                            checked={leave}
                            value="leave"
                            />

                          </div>
                          <div>
                            Annoucements
                            <input type="checkbox" 
                            
                            onChange={handlejoin}
                            checked={announce}
                            value="announce"
                            />
                          </div>

                        </div>
                      </div>
                      <ColoredLine color="grey" />     
                        <div class="row">

                        <div class="col-sm-12">
                          <button class="submit">submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>            
          </div>
        </div> 
      </div>
    </div>
  )

}

export default EditProfile;
