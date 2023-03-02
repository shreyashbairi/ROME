import "../css/Calendar.css";
import React, {Component} from 'react';
import CalendarDays from "./CalendarDays";
import AddEvent from "./AddEvent";
import Popup from 'reactjs-popup';
import { useState } from "react";



export default function CalendarFunc (props) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const hours =['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
                     '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am']
    const [currentDay, setCurrentDay] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);

    
    const scheduleEventHour = (hour) => {
        const newevent = {
            date: hour.date,
            time: hour.time,
            top: false //only make top kinda need pop up first tho i think
        };
        setEvents([...events, newevent])
    }

    const scheduleEvent = (newElapsedEvent) => { //Deal with server communication within this fucntion
        const elapsedEvent = [];
        if (newElapsedEvent.endTime === 1) {
            newElapsedEvent.endTime = 25;
        }
        for (let i = newElapsedEvent.startTime; i < newElapsedEvent.endTime; i++) {
            let topHour = false;
            if (i === newElapsedEvent.startTime) {
                topHour = true;
            }
            const newevent = {
                date: newElapsedEvent.date,
                time: i,
                top: topHour,
                title: newElapsedEvent.title
            }; 
            elapsedEvent.push(newevent)
        }
        setEvents([...events, ...elapsedEvent])

        // saveEventHandler(newElapsedEvent);
    }
    
    
    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
    }

    const nextWeek = () => {
        setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() + 7)));
    }
    
    const previousWeek = () => {
        setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() - 7)));
    }

    
    const openform = () => {
        setShow(true);
    };

    const closeform = () => {
        setShow(false);
    }

    
    return (
        <>

            <div class="Calendar-container">

                <div class="Calendar-header">
                    <div class="header-left">
                    <button type="button" class="btn btn-secondary" onClick={previousWeek}>&#60;</button>
                    <button type="button" class="btn btn-secondary" onClick={nextWeek}>&#62;</button>
                    </div>
                    <h2 class="Calendar-header-content">{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
                    <div class="header-right">

                    <Popup class="addevent" trigger={<button type="button" class="btn btn-secondary">Add Events </button>} open={show}
                    onOpen={openform} position="right center" nested modal>
                        <div class="card">
                        <AddEvent  
                                trigger={show}
                                setTrigger={closeform}
                                scheduleEvent={scheduleEvent}
                            />     
                        </div>
                    </ Popup>

                    <button type="button" class="btn btn-secondary">Week</button>
                    </div>
                </div>
                <div class="Calendar-content-body">
                    <div class="time-sidebar">
                        {
                            hours.map((hour) => {
                                return <div className="hour"><p>{hour}</p></div>
                            })
                        }
                    </div>
                    <div class="Calendar-Content">
                        <div className="calendar-body">
                            <div className="table-header">
                            {
                                weekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                                })
                            }
                            </div>
                            <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} 
                                        events={events} scheduleEventHour={scheduleEventHour} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
        
        
}
