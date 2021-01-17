document.addEventListener("DOMContentLoaded", () => {
    let currentDate = new Date(),
        months = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const body = document.querySelector("body"),
          glass = document.querySelectorAll(".glass");

    //ADD TASK
    const addButton = document.querySelector("#addButton"),
          closeButton = document.querySelector("#closeButton"),
          main = document.querySelector("main"),
          setDate = document.querySelector(".setDate"),
          content = document.querySelector(".content"),
          add__task__window__wrapper = document.querySelector(".add__task__window__wrapper"),
          
          set__task__name = document.querySelector(".set__task__name"),
          task__name__OK__button = document.querySelector("#task__name__OK__button"),
          task__name__input = document.querySelector("#name"),

          set__task__color = document.querySelector(".set__task__color"),
          task__colors = document.querySelectorAll("th"),
          task__color__back__button = document.querySelector("#task__color__back__button"),

          set__task__time = document.querySelector(".set__task__time"),
          clock = document.querySelector(".clock"),
          clockHours = clock.querySelector(".hours"),
          clockMinutes = clock.querySelector(".minutes"),
          task__time__back__button = document.querySelector("#task__time__back__button"),
          task__time__OK__button = document.querySelector("#task__time__OK__button"),
          task__date__skip__button = document.querySelector("#task__date__skip__button"),

          set__task__notifications = document.querySelector(".set__task__notifications"),
          task__notifications__back__button = document.querySelector("#task__notifications__back__button"),
          task__notifications__OK__button = document.querySelector("#task__notifications__OK__button"),
          
          notifications = set__task__notifications.querySelectorAll("input");

    let name = "New task",
        color = "blue",
        date = "",
        time = "",
        notification_10min,
        notification_1hour,
        notification_1day;

    function buildClock() {
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        if (hours < 10) {
            clockHours.innerHTML = "0" + hours;
        }
        else {
            clockHours.innerHTML = hours;
        }
        
        if (minutes < 10) {
            clockMinutes.innerHTML = "0" + minutes;
        }
        else {
            clockMinutes.innerHTML = minutes;
        }

        clockHours.addEventListener("click", () => {

            if (hours < 23) {
                hours++;
            }
            else {
                hours = 0;
            }

            if (hours < 10) {
                clockHours.innerHTML = "0" + hours;
            }
            else {
                clockHours.innerHTML = hours;
            }
            
            if (minutes < 10) {
                clockMinutes.innerHTML = "0" + minutes;
            }
            else {
                clockMinutes.innerHTML = minutes;
            }

        });

        clockMinutes.addEventListener("click", () => {

            if (minutes < 59) {
                minutes++;
            }
            else {
                minutes = 0;
            }      
            
            if (hours < 10) {
                clockHours.innerHTML = "0" + hours;
            }
            else {
                clockHours.innerHTML = hours;
            }
            
            if (minutes < 10) {
                clockMinutes.innerHTML = "0" + minutes;
            }
            else {
                clockMinutes.innerHTML = minutes;
            }

        });
    }

    addButton.addEventListener("click", () => {
    
        main.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");
        set__task__name.classList.toggle("hide");

        task__name__input.focus();

        let day = new Date().getDate(),
            month = new Date().getMonth() + 1;

        if (document.querySelector(".calendar__activeDay") != null) {
            day = +(document.querySelector(".calendar__activeDay").innerHTML);
            month = currentDate.getMonth() + 1;
        }

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }

        date = day + "." + month;
        
    });

    closeButton.addEventListener("click", () => {
        main.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");

        set__task__name.classList.add("hide");
        set__task__color.classList.add("hide");
        set__task__time.classList.add("hide");
        set__task__notifications.classList.add("hide");

        name = "";
        color = "";
        date = "";
        time = "";
        notification_10min = "";
        notification_1hour = "";
        notification_1day = "";

    });

    task__name__OK__button.addEventListener("click", () => {
        if (task__name__input.value == "") {
            name = "New task";
        }
        else {
            name = task__name__input.value;
        }

        set__task__name.classList.toggle("hide");
        set__task__color.classList.toggle("hide");
    });

    task__colors.forEach(item => {
        item.addEventListener("click", (event) => {
            color = event.target.style.backgroundColor;

            set__task__color.classList.toggle("hide");
            set__task__time.classList.toggle("hide");

            buildClock();
        });
    });

    task__color__back__button.addEventListener("click", () => {
        set__task__color.classList.toggle("hide");
        set__task__name.classList.toggle("hide");
    });

    task__time__OK__button.addEventListener("click", () => {

        time = clockHours.innerHTML + ":" + clockMinutes.innerHTML;

        set__task__time.classList.toggle("hide");
        set__task__notifications.classList.toggle("hide");
    });

    task__time__back__button.addEventListener("click", () => {
        set__task__time.classList.toggle("hide");
        set__task__color.classList.toggle("hide");
    });

    task__date__skip__button.addEventListener("click", (event) => {
        set__task__time.classList.toggle("hide");
        set__task__notifications.classList.toggle("hide");
    });

    task__notifications__back__button.addEventListener("click", () => {
        set__task__notifications.classList.toggle("hide");
        set__task__time.classList.toggle("hide");
    });

    task__notifications__OK__button.addEventListener("click", () => {

        set__task__notifications.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");
        main.classList.toggle("hide");

        if (notifications[0].checked == true) {
            notification_10min = "checked";
        }
        else {
            notification_10min = "";
        }

        if (notifications[1].checked == true) {
            notification_1hour = "checked";
        }
        else {
            notification_1hour = "";
        }

        if (notifications[2].checked == true) {
            notification_1day = "checked";
        }
        else {
            notification_1day = "";
        }

        task = document.createElement("div");
        task.innerHTML = `
            <div class="task glass">

                <div class="taskMain">
                    <div style="background: ${color}" class="task__color"></div>

                    <div class="task__name">${name}</div>

                    <div class="task__date">${date}</div>
                    
                    <div class="task__time">${time}</div>
                </div>

                <div class="taskExpanded">
                    <div class="textarea">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <div class="buttons">
                            <button>Save</button>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div class="task__notifications">
                        🔔
                        <p>1 day</p>

                        <label class="switch">
                            <input type="checkbox" ${notification_1day}>
                            <span class="slider"></span>
                        </label>

                        <hr>

                        <p>1 hour</p>
                        
                        <label class="switch">
                            <input type="checkbox" ${notification_1hour}>
                            <span class="slider"></span>
                        </label>

                        <hr>

                        <p>10 min</p>

                        <label class="switch">
                            <input type="checkbox" ${notification_10min}>
                            <span class="slider"></span>
                        </label>  
                    </div>                
                </div>
                
            </div>
        `
        content.append(task);

        task.addEventListener("click", (event) => {
            //event.target.parentNode.classList.toggle("taskExpanded");

            if (event.target.classList.contains("task__name") || event.target.classList.contains("task__date") || event.target.classList.contains("task__time")) {
                event.target.parentElement.parentElement.classList.toggle("taskExpanded");
            }
            if (event.target.classList.contains("taskMain")) {
                event.target.parentElement.classList.toggle("taskExpanded");
            }
            else {
                event.target.classList.toggle("taskExpanded");
            }
        });
    });












    //CALENDAR 
    const calendar__currentMonth = document.querySelector(".calendar__currentMonth"),
          calendar__previousMonth = document.querySelector(".calendar__previousMonth"),
          calendar__nextMonth = document.querySelector(".calendar__nextMonth"),
          calendar__days = document.querySelector(".calendar__days");

    let days;

    function buildCalendar () {
        let mm = currentDate.getMonth(),
            yy = currentDate.getFullYear(),
            dd = currentDate.getDate(),

            currentMonth = months[mm];

        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
            lastDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay(),
            firstDayIndex = currentDate;
                            firstDayIndex.setDate(1); 
                            firstDayIndex = firstDayIndex.getDay();

        let prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

        nextMonth = months[months.indexOf(currentMonth) + 1];
        previousMonth = months[months.indexOf(currentMonth) - 1];

        if (currentMonth == "Januar") {
            previousMonth = months[11];
        }
        if (currentMonth == "December") {
            nextMonth = months[0];
        }

        calendar__currentMonth.innerHTML = `${currentMonth} ${yy}`;
        calendar__previousMonth.innerHTML = `${previousMonth}`;
        calendar__nextMonth.innerHTML = `${nextMonth}`;

        days = document.createElement("div");
        days.classList.add("days");
        calendar__days.append(days);

        for (i = firstDayIndex - 1; i > 0; i--) {
            days.innerHTML += `<div class="calendar__anotherMonth">${prevMonthLastDay - i}</div>`;
        }; // adds previous month`s days to start

        for (i = 1; i <= lastDay; i++) {
            days.innerHTML += `<div class="calendar__actualMonth">${i}</div>`;
        };  // add all days

        for (i = 1; i <= 7 - lastDayIndex; i++) {
            days.innerHTML += `<div class="calendar__anotherMonth">${i}</div>`;
        };

        document.querySelectorAll(".calendar__actualMonth").forEach(item => {
            if (item.innerHTML == new Date().getDate() && mm == new Date().getMonth()) {
                item.classList.add("calendar__activeDay");
            }
        })
    };

    buildCalendar();

    calendar__nextMonth.addEventListener("click", () => {
        days.remove();

        let mm = currentDate.getMonth();
        currentDate.setMonth(mm + 1);

        currentMonth = months[currentDate.getMonth()];

        buildCalendar();
    });

    calendar__previousMonth.addEventListener("click", () => {
        days.remove();

        let mm = currentDate.getMonth();
        currentDate.setMonth(mm - 1);

        currentMonth = months[currentDate.getMonth()];

        buildCalendar();
    });

    calendar__days.addEventListener("click", (event) => {
        if (!event.target.classList.contains("days")) {

            days.querySelectorAll("div").forEach(item => {
                item.classList.remove("calendar__activeDay");
            })
            event.target.classList.add("calendar__activeDay");

        }
    });
                
});