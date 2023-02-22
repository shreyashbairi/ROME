function CalendarDays(props) {
    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let firstDayOfWeek = new Date(props.day);
    let weekdayOfCurDay = firstDayOfWeek.getDay();
    let currentDays = [];
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

        currentWeekDays.push(calendarWeekDay);
    }

    for (let i=0; i < amountHours; i++) {
        
        currentTimes.push(i)
    }
    return (
        <>
        <div className="table-content">
            {
                currentWeekDays.map((day) => {
                return (
                    <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}>
                            {/* onClick={() => props.changeCurrentDay(day)}> */}
                        <p>{day.number}</p>
                    </div>
                )
                })
            }
            {
                currentTimes.map(() => {
                return (
                    <div className={"calendar-day p"}>
                        <p>{}</p>
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