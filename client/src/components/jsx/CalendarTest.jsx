import "../css/Calendar.css";
import React, {Component} from 'react';
import CalendarDays from "./CalendarDays";

class CalendarTest extends Component {
    constructor() {
        super();

        this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        this.hours =['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', 
                     '12pm','1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am']
    
        this.state = {
          currentDay: new Date() // Get from time of week grabed from backend
        }
        
    }
    
    changeCurrentDay = (day) => {
        this.setState({ currentDay: new Date(day.year, day.month, day.number) });
    }

    render() {
        return (
            <div class="Calendar-container">
                <div class="Calendar-header">
                    <div class="header-left">
                    <button type="button" class="btn btn-secondary">&#60;</button>
                    <button type="button" class="btn btn-secondary">&#62;</button>
                    </div>
                    <h2 class="Calendar-header-content">{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
                    <div class="header-right">
                    <button type="button" class="btn btn-secondary">Week</button>
                    </div>
                </div>
                <div calss="time-sidebar">

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
        );

    }
        
}

function CalendarData () {

}
    
export default CalendarTest;