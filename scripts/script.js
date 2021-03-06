document.addEventListener("DOMContentLoaded", () => {
    let currentDate = new Date(),
        months = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const body = document.querySelector("body"),
          glass = document.querySelectorAll(".glass");

    //ADD TASK
    const addButton = document.querySelector("#addButton"),
          closeButton = document.querySelector("#closeButton"),
          main = document.querySelector("main"),
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
          task__time__OK__button = document.querySelector("#task__time__OK__button");

    let object = {
        name: "New task",
        color: "blue",
        date: "",
        time: "",
        notification_10min: "checked",
        notification_1hour: "",
        notification_1day: ""
    }

    const buildClock = () => {
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

    const buildTask = (clickedDay) => {
        getResource('http://localhost:3000/requests')
        .then(data => {
            data.forEach(({date, time, name, color, notification_10min, notification_1hour, notification_1day, id}) => {
                if (date == clickedDay) {
                    task = document.createElement("div");
                    task.setAttribute("class", "task");
                    task.innerHTML = `
              
                        <div class="header">
                            <div class="taskColor" style="background: ${color}"></div>
                            <div class="taskName">${name}</div>
                            <div class="taskTime">${time}</div>
                        </div>
            
                        <div class="main">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <div class="buttons">
                                <button class="done">✔</button>
                                <button>🖊</button>
                                <button class="delete">❌</button>
                            </div>
                        </div>
            
                        <div class="right">
                            <div class="notifications">
                                <div>
                                    <p>1 day</p>
        
                                    <label class="switch">
                                        <input type="checkbox" ${notification_1day}>
                                        <span class="slider"></span>
                                    </label>
                                    <hr>
                                </div>
        
                                <div>
                                    <p>1 hour</p>
                                    
                                    <label class="switch">
                                        <input type="checkbox" ${notification_1hour}>
                                        <span class="slider"></span>
                                    </label>
                                    <hr>
                                </div>
                                
                                <div>
                                    <p>10 min</p>
                
                                    <label class="switch">
                                        <input type="checkbox" ${notification_10min}>
                                        <span class="slider"></span>
                                    </label> 
                                </div>
                            </div>`
            
                    content.append(task);
        
                    task.addEventListener("click", (event) => {
                        if (event.target.classList.contains("taskName") || event.target.classList.contains("taskColor") || event.target.classList.contains("taskDate") || event.target.classList.contains("taskTime")) {
                            event.target.parentElement.parentElement.classList.toggle("expanded");
                        }
                        if (event.target.classList.contains("done")) {
                            event.target.parentElement.parentElement.parentElement.classList.toggle("expanded");
                        }
                        else {
                            event.target.parentElement.classList.toggle("expanded");
                        }
                    });        

                    task.querySelector(".delete").addEventListener("click", () => {
                        fetch(`http://localhost:3000/requests/${id}/`, {
                            method: 'DELETE',
                        });
                        task.remove();
                        document.querySelectorAll(".calendar__actualMonth").forEach(item => {
                            if (item.classList.contains("calendar__activeDay")) {
                                item.style.backgroundColor = "";
                                item.style.color = "";
                                item.classList.toggle("calendar__activeDay");
                                item.classList.toggle("calendar__activeDay");
                            }
                        }) 
                    });
                }
            });
        });
    }

    addButton.addEventListener("click", () => {    
        main.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");
        set__task__name.classList.toggle("hide");

        task__name__input.focus();

        let day = new Date().getDate(),
            month = new Date().getMonth() + 1;
            year = new Date().getFullYear();

        if (document.querySelector(".calendar__activeDay") != null) {
            day = +(document.querySelector(".calendar__activeDay").innerHTML);
            month = currentDate.getMonth() + 1;
            year = currentDate.getFullYear();
        }

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }

        object.date = day + "." + month + "." + year;
    });

    closeButton.addEventListener("click", () => {
        main.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");

        set__task__name.classList.add("hide");
        set__task__color.classList.add("hide");
        set__task__time.classList.add("hide");

        object.name = "";
        object.color = "";
        object.date = "";
        object.time = "";
        object.notification_10min = "";
        object.notification_1hour = "";
        object.notification_1day = "";
    });
    
    task__time__back__button.addEventListener("click", () => {
        set__task__time.classList.toggle("hide");
        set__task__name.classList.toggle("hide");
    });

    task__name__OK__button.addEventListener("click", () => {
        if (task__name__input.value == "") {
            object.name = "New task";
        }
        else {
            object.name = task__name__input.value;
        }

        set__task__name.classList.toggle("hide");
        set__task__time.classList.toggle("hide");
        buildClock();
    });

    task__color__back__button.addEventListener("click", () => {
        set__task__color.classList.toggle("hide");
        set__task__time.classList.toggle("hide");
    });

    task__time__OK__button.addEventListener("click", () => {
        object.time = clockHours.innerHTML + ":" + clockMinutes.innerHTML;

        set__task__time.classList.toggle("hide");
        set__task__color.classList.toggle("hide");
    });

    task__colors.forEach(item => {
        item.addEventListener("click", (event) => {
            object.color = event.target.style.backgroundColor;

            set__task__color.classList.toggle("hide");
            add__task__window__wrapper.classList.toggle("hide");
            main.classList.toggle("hide");

            //BACKEND
            const postData = async (url, data) => {
                const res = await fetch (url, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: data
                });
            }

            postData("http://localhost:3000/requests", JSON.stringify(object));

            if (days) { days.remove() };
            buildCalendar();
            buildTask(object.date);

        });

    });







    //CALENDAR 
    const calendar__currentMonth = document.querySelector(".calendar__currentMonth"),
          calendar__previousMonth = document.querySelector(".calendar__previousMonth"),
          calendar__nextMonth = document.querySelector(".calendar__nextMonth"),
          calendar__days = document.querySelector(".calendar__days");

    let days;

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

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
        calendar__previousMonth.innerHTML = `< ${previousMonth.slice(0,3)}`;
        calendar__nextMonth.innerHTML = `${nextMonth.slice(0,3)} >`;

        days = document.createElement("div");
        days.classList.add("days");
        calendar__days.append(days);

        if (firstDayIndex == 0) { firstDayIndex = 7};

        if (firstDayIndex == 1) {
            for (i = 7; i > 0; i--) {
                days.innerHTML += `<div class="calendar__anotherMonth">${prevMonthLastDay - i + 1}</div>`;
            };
        }
        else {
            for (i = firstDayIndex - 1; i > 0; i--) {
                days.innerHTML += `<div class="calendar__anotherMonth">${prevMonthLastDay - i + 1}</div>`;
            }; // adds previous month`s days to start
        }

        for (i = 1; i <= lastDay; i++) {
            days.innerHTML += `<div class="calendar__actualMonth">${i}</div>`;
        };  // add all days

        // for (i = 1; i <= 7 - lastDayIndex; i++) {
        //     days.innerHTML += `<div class="calendar__anotherMonth">${i}</div>`;
        // }

        if (days.querySelectorAll("div").length < 42) {
            let x = 42 - days.querySelectorAll("div").length;
            for (i = 1; i <= x; i++) {
                days.innerHTML += `<div class="calendar__anotherMonth">${i}</div>`;
            }
        }


        document.querySelectorAll(".calendar__actualMonth").forEach(item => {
            if (item.innerHTML == new Date().getDate() && mm == new Date().getMonth()) {
                item.classList.add("calendar__activeDay");
            }
        })

        getResource('http://localhost:3000/requests')
        .then(data => {
            data.forEach(({date, time, name, color, notification_10min, notification_1hour, notification_1day}) => {
                let day = date.split(".")[0];
                //day = +day < 10 ? "0" + day : day;
                let month = date.split(".")[1];
                //month = +month < 10 ? "0" + month : month;
                let year = date.split(".")[2];

                if (mm + 1 == month && currentDate.getFullYear() == year) {
                    days.querySelectorAll(".calendar__actualMonth").forEach(item => {
                        if (+item.innerHTML == day) {
                            item.style.backgroundColor = color;
                            item.style.color = "white";
                        }
                    })
                }
            });
        });

        let array = days.querySelectorAll("div");

        for (let index = 5; index < 42;) {
            array[index].style.color = "red";
            array[index + 1].style.color = "red";

            index += 7;
        }
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

            document.querySelectorAll(".task").forEach(item => {item.remove()});

            let d = +event.target.innerHTML < 10 ? "0" + event.target.innerHTML : event.target.innerHTML,
                m = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1,
                y = currentDate.getFullYear();

            let clickedDay = `${d}.${m}.${y}`;

            buildTask(clickedDay);
        
            days.querySelectorAll("div").forEach(item => {
                item.classList.remove("calendar__activeDay");
            })
            event.target.classList.add("calendar__activeDay");

        }
    });


    //DEVICE COLOR THEME
    // function checkSystemColorScheme() {
    //     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            
    //         body.classList.remove("bright");
    //         body.classList.add("dark");

    //         document.querySelectorAll(".glass").forEach(item => {
    //             item.classList.add("darkGlass");
    //         });

    //         document.querySelectorAll("button").forEach(item => {
    //             item.style.color = "white";
    //         });

    //         document.querySelector("#name").classList.remove("blackPlaceholder");
    //         document.querySelector("#name").classList.add("whitePlaceholder");
    //     }
    //     else {
    //         body.classList.remove("dark");
    //         body.classList.add("bright");

    //         document.querySelectorAll(".glass").forEach(item => {
    //             item.classList.remove("darkGlass");
    //         });

    //         document.querySelectorAll("button").forEach(item => {
    //             item.style.color = "black";
    //         });

    //         document.querySelector("#name").classList.remove("whitePlaceholder");
    //         document.querySelector("#name").classList.add("blackPlaceholder");
    //     }
    // }

    // checkSystemColorScheme();

    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    //     checkSystemColorScheme();
    // });
         
    


});  