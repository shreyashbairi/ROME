import React from "react";
import "../css/TeamPop.css";
import { useState } from "react";
import { useContext } from "react";
import { TeamContext } from "./DefaultLayout";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamHome from "./TeamHome"
axios.defaults.baseURL = 'http://localhost:8000';

function CreateAnnoucements(props) {
    const [title, setTitle] = useState("")
    let teams = [];
    const teamname = useContext(TeamContext);
    const [description, setDescription] = useState("")
    const [data, setData] = useState({
        name: {title},
        description: {description}
    })

    async function handleSubmit(e) {
        console.log("HI");
        e.preventDefault();
        console.log(title);
        console.log(description);
        const teamname = localStorage.getItem("teamname");
        try {
            await axios.post('/annoucements',{
              title,
              teamname,
              description
            });
            alert("Annoucement Created!");
          } catch (e){
            alert('Annoucement Creation Failed')
          }

        props.setTrigger(false);
        setTitle("");
        setDescription("");
    }

    // const handleName = (e) => {
    //     setName(e.target.value);
    //     // console.log(team);
    //     const newdata = {...data}
    //     newdata[e.target.id]=e.target.value
    //     setData(newdata)
    //     //console.log(newdata)
    // }

    // const handleDescription = (e) => {
    //     setDescription(e.target.value);
    //     console.log(description);
    //     const newdata = {...data}
    //     newdata[e.target.id]=e.target.value
    //     setData(newdata)
    //     //console.log(newdata)
    // }

    const openTeamPage = e => {
        return (
            // <BrowserRouter>
            //     <Routes>
            //         <Route path="/team" element={<TeamHome />}/>
            //     </Routes>
            // </BrowserRouter>
            <>
                props.setTrigger(false)
            </>
        )
    }
//popup for invite
    return(props.trigger) ? (
        
            <div className="card-body">

                <h3>Create Annoucement</h3>
                <form 
                    id="new-team-form"
                    onSubmit={handleSubmit}
                > 
                    <div class="col-sm-9 text-secondary mt-5">
                        <input
                            id="team"
                            placeholder="Title"
                            type="text"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>

                    <div class="col-sm-9 text-secondary mt-4">
                    <textarea
                        id="description"
                        placeholder="Description"
                        type="text"
                        className="description-box"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                    </div> 
                    <button>Submit</button> 
 
                </form>
                <button className="close" onClick={()=> props.setTrigger()}>
                    close
                </button>
                
            </div>


    ) : "";

}

export default CreateAnnoucements