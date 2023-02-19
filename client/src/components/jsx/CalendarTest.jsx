import "../css/Calendar.css";
import React, {Component} from 'react';

class CalendarTest extends Component {
     
    render() {
        return (
            <div class="Calendar-container">
                <div class="Calendar-header">
                    <div class="header-left">
                    <button type="button" class="btn btn-secondary">&#60;</button>
                    <button type="button" class="btn btn-secondary">&#62;</button>
                    </div>
                    <h2 class="Calendar-header-content">Calendar</h2>
                    <div class="header-right">
                    <button type="button" class="btn btn-secondary">Week</button>
                    </div>
                </div>
                <div class="Calendar-Content">
                    <div class="Week-header">
                        <div class="container text-center">
                            <div class="row row-cols-7">
                                <div class="col">Sun</div>
                                <div class="col">Mon</div>
                                <div class="col">Tue</div>
                                <div class="col">Wed</div>
                                <div class="col">Thur</div>
                                <div class="col">Fri</div>
                                <div class="col">Sat</div>
                            </div>
                            <div class="row row-cols-7"> {/*TODO MAKE THESE DATES CHANGE */}
                                <div class="col">19</div>
                                <div class="col">20</div>
                                <div class="col">21</div>
                                <div class="col">22</div>
                                <div class="col">23</div>
                                <div class="col">24</div>
                                <div class="col">25</div>
                            </div>
                        </div>
                    </div>
                    <div class="Event-Container">
                        {/* <table>
                           <td>12am</td>
                           <tr></tr>
                           <td>1am</td>
                           <tr></tr>
                        </table> */}
                        {/* <div class="time-bar">
                        <div class="container text-center">
                            <div class="row row-cols-1">
                                <div class="col">12am</div>
                                <div class="col">1am</div>
                                <div class="col">2am</div>
                                <div class="col">3am</div>
                            </div>
                        </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );

    }
        
}
    
export default CalendarTest;