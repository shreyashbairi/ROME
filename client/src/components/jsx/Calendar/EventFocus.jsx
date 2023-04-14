import "../../css/Calendar.css";
import React, {Component} from 'react';
import { useState, useEffect } from "react";




export default function EventFocus (props) {
    const [teamSelected, setTeamSelected] = useState([]);
    let teamBoxes = [];
    let tempColor = props.personalColor;
    if (tempColor === "#0d6efd") {
        tempColor = "#1D9BD1"
    }
    teamBoxes.push({
        id: 0,
        teamName: "Personal",
        color: tempColor
    })
    for (let i = 0; i < props.teams.length; i++) {
        let teamBox = {
            id: i + 1,
            teamName: props.teams[i].team,
            color: props.teams[i].color,
        }
        teamBoxes.push(teamBox)
    }

    // useEffect( () => {
    //     handleSelect(null);
    // }, [])


    const handleSelect = (event) => {
        const teamName = event.target.value;
        const isChecked = event.target.checked;

     
        if (isChecked) {
            const filteredList = [...teamSelected, teamName]
            setTeamSelected(filteredList);
            props.handleFocus(filteredList);
        } else {
            const filteredList = teamSelected.filter((item) => item !== teamName);
            setTeamSelected(filteredList);
            props.handleFocus(filteredList);
        }
    };
    return (
        <>
            <div className="card-header">
                <p className="title">Hide Teams</p>
            </div>
            <div class="focus-body">
            {teamBoxes.map((item, index) => {
                return (
                <div key={item.id} className="checkbox-container">
                    <input
                    type="checkbox"
                    name="teams"
                    value={item.teamName}
                    onChange={handleSelect}
                    />
                    <label style={{color: item.color}}>{item.teamName}</label>
                </div>
                );
            })}
            </div>
        </>
    )
}
