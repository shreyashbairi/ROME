import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

class Calendar extends Component {
constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
}

get calendar() {
    return this.calendarRef.current.control;
}


render() {
    return (
      <div>
        <DayPilotCalendar
            viewType = "Week"
            ref={this.calendarRef}
        />
      </div>
    );
  }
}

export default Calendar;