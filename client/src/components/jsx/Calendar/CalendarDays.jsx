function CalendarDays(props) {
    // let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    // let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let firstDayOfWeek = new Date(props.day);
    let weekdayOfCurDay = firstDayOfWeek.getDay();
    // let currentDays = [];
    let currentWeekDays = [];
    let amountHours = 168;
    let currentTimes = [];

    // for (let day = 0; day < 35; day++) {
    //     if (day === 0 && weekdayOfFirstDay === 0) {
    //     firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    //     } else if (day === 0) {
    //     firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    //     } else {
    //     firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    //     }

    //     let calendarDay = {
    //     currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
    //     date: (new Date(firstDayOfMonth)),
    //     month: firstDayOfMonth.getMonth(),
    //     number: firstDayOfMonth.getDate(),
    //     selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
    //     year: firstDayOfMonth.getFullYear()
    //     }

    //     currentDays.push(calendarDay);
    // }
    
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
            color: "#f1f1f1"
        }
        for (let j = 0; j < props.events.length; j++) {
            if (props.events[j].time === hour.time && props.events[j].date.getDate() === hour.date.getDate()) {
                hour.selected = true;
                hour.color = props.events[j].color;
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
    return (
        <>
        <div className="table-content">
            {
                currentWeekDays.map((day) => {
                return (
                    <div className={"calendar-day" + (day.currentMonth ? " current" : "") + 
                            (day.selected && day.date.getDate() === new Date().getDate() ? " selected" : "") + 
                            (props.viewMode === 5 ? " work" : " full")}>
                             {/* onClick={() => props.changeCurrentDay(day)}> */}
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
                        (props.viewMode === 5 ? " work-hour" : " full-hour")} 
                        style={{backgroundColor: hour.color}}>
                        <p>{hour.selected && hour.top ? hour.name : ""}</p>
                    </div>
                )
                })
            }
        </div>
        {/* <div className="table-content">
        {
            currentDays.map((day) => {
            return (
                <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                        onClick={() => props.changeCurrentDay(day)}>
                    <p>{day.number}</p>
                </div>
            )
            })
        }
      </div> */}
      </>
    )
  }
  
export default CalendarDays;