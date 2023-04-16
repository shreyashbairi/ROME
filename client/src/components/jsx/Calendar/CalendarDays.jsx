

function CalendarDays(props) {
    // let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    // let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let firstDayOfWeek = new Date(props.day);
    let weekdayOfCurDay = firstDayOfWeek.getDay();
    // let currentDays = [];
    let currentWeekDays = [];
    let amountHours = 168;
    let currentTimes = [];

    const handleDetails = (hour) => {
        if (hour.selected) {
            props.openDetails(hour);
        }
    }
    
    for (let day = 0; day < 7; day++) {
        if (day === 0) {
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - weekdayOfCurDay);
        } else {
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
        }

        let calendarWeekDay = {
        currentMonth: (firstDayOfWeek.getMonth() === props.day.getMonth()),
        date: (new Date(firstDayOfWeek)),
        month: firstDayOfWeek.getMonth(),
        number: firstDayOfWeek.getDate(),
        selected: (firstDayOfWeek.toDateString() === props.day.toDateString()),
        year: firstDayOfWeek.getFullYear()
        }
        if (props.viewMode == 5) { // will skip sun and sat if work week
            if (calendarWeekDay.date.getDay() != 0 && calendarWeekDay.date.getDay() != 6) {
                currentWeekDays.push(calendarWeekDay)
            }
        } else {
            currentWeekDays.push(calendarWeekDay);
        }
    }

    for (let i=0; i < amountHours; i++) {
        if (i%7 === 0) {
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 6);
        } else {
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
        }
        //event display handler
        let hour = {
            day: i%7, 
            time: ((i - i%7) / 7) + 1,
            selected: false,
            name: "NA",
            top: false,
            date: (new Date(firstDayOfWeek)),
            color: "#f1f1f1",
            type: "user",
            descriptin: "NA"
        }
        // console.log(hour.date);
        for (let j = 0; j < props.events.length; j++) {
            if (props.events[j].time === hour.time && props.events[j].date.getDate() === hour.date.getDate() 
                //&& props.events[j].getMonth() === hour.date.getMonth()
                //&& props.events[j].getFullyear() === hour.date.getFullyear()
                && !props.focusTeams.includes(props.events[j].teamName)) { //not is used as bandaid TODO fix
                // console.log(props.events[j].date);
                // console.log(hour.date);
                hour.selected = true;
                hour.name = props.events[j].title;
                hour.descriptin = props.events[j].descriptin;
                if (props.events[j].type === "team") {
                    hour.type = "team"
                    hour.color = props.events[j].color;
                } else {
                    if (props.personalColor === "#0d6efd") {
                        hour.color = props.events[j].color;
                    } else {
                        hour.color = props.personalColor;
                    }
                }
                if (props.events[j].top) {
                    hour.top = true;
                    hour.name = props.events[j].title;
                }
            }
        }
        if (props.viewMode == 5) {
            if (hour.day != 0 && hour.day != 6) {
                currentTimes.push(hour);
            }
        } else {
            currentTimes.push(hour)
        }
    }
    // console.log("EventDays");
    // console.log(props.events[0].date.toDateString());
    // console.log(currentTimes[0].date.toDateString());
    return (
        <>
        <div className="table-content">
            {
                currentWeekDays.map((day) => {
                return (
                    <div className={"calendar-day" + (day.currentMonth ? " current" : "") + 
                            (day.selected && day.date.getDate() === new Date().getDate() ? " selected" : "") + 
                            (props.viewMode === 5 ? " work" : " full")}>
                            {/* onClick={() => props.changeCurrentDay(day)} */}
                        <p>{day.number}</p>
                    </div>
                )
                })
            }
            {
                currentTimes.map((hour) => {
                return (
                    // <div className={"calendar-hour" + (hour.selected ? " scheduled" : "") + 
                    //     (props.viewMode === 5 ? " work-hour" : " full-hour")}>
                    //     {/* onClick= {() => props.scheduleEventHour(hour)}> */}
                    //     <p>{hour.selected && hour.top ? hour.name : ""}</p>
                    // </div>
                    <div className={"calendar-hour" + 
                        (props.viewMode === 5 ? " work-hour" : " full-hour") 
                        } 
                        style={{backgroundColor: hour.color}} onClick = {() => handleDetails(hour)}>
                        <p>{hour.selected && hour.top ? hour.name : ""}</p>
                    </div>
                )
                })
            }
        </div>
      </>
    )
  }
  
export default CalendarDays;