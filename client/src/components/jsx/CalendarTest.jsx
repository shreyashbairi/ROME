import "../css/Calendar.css";
import React, {Component} from 'react';
import CalendarDays from "./CalendarDays";

class CalendarTest extends Component {
    constructor() {
        super();

        this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        this.hours =['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
                     '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am']
    
        this.state = {
          currentDay: new Date()
        }
        
    }
    
    changeCurrentDay = (day) => {
        this.setState({ currentDay: new Date(day.year, day.month, day.number) });
    }

    nextWeek = () => {
        this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() + 7)) });
    }
    
    previousWeek = () => {
        this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() - 7)) });
    }


    render() {
        return (
            <div class="Calendar-container">
                <div class="Calendar-header">
                    <div class="header-left">
                    <button type="button" class="btn btn-secondary" onClick={this.previousWeek}>&#60;</button>
                    <button type="button" class="btn btn-secondary" onClick={this.nextWeek}>&#62;</button>
                    </div>
                    <h2 class="Calendar-header-content">{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
                    <div class="header-right">
                    <button type="button" class="btn btn-secondary">Week</button>
                    </div>
                </div>
                <div class="Calendar-content-body">
                    <div class="time-sidebar">
                        {
                            this.hours.map((hour) => {
                                return <div className="hour"><p>{hour}</p></div>
                            })
                        }
                    </div>
                    <div class="Calendar-Content">
                        <div className="calendar-body">
                            <div className="table-header">
                            {
                                this.weekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                                })
                            }
                            </div>
                            <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
                        </div>
                    </div>
                </div>
            </div>
        );

    }
        
}

    
export default CalendarTest;