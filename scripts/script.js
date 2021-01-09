document.addEventListener("DOMContentLoaded", () => {

    //HAMBURGER MENU
    const menu__button = document.querySelector(".menu__button")
          menu__wrapper = document.querySelector(".menu__wrapper"),
          menu = document.querySelector(".menu");

    menu__button.addEventListener('click', (event) => {
        event.preventDefault();
        if (menu.classList.contains("show__menu")) {
            // menu__wrapper.classList.add("hide");
            // menu__wrapper.classList.remove("show");
            menu.classList.remove("show__menu");
            menu.classList.add("close__menu");
            menu__wrapper.style.maxHeight = "0px";
        }
        else {
            // menu__wrapper.classList.add("show");
            // menu__wrapper.classList.remove("hide");
            menu.classList.add("show__menu");
            menu.classList.remove("close__menu");
            menu__wrapper.style.maxHeight = "300px";
        }
    });

    //TASK OBJECT
    function Task(name, color, date, time, notification_10min, notification_1hour, notification_1day) {
        this.name = name;
        this.color = color;
        this.date = date;
        this.time = time;
        this.notification_10min = notification_10min;
        this.notification_1hour = notification_1hour;
        this.notification_1day = notification_1day;
    };


    //ADD TASK
    const toDo = document.querySelector('#toDo'),
        
          add__task__button = document.querySelector(".add__task__button"),
          content = document.querySelector(".content"),
          add__task__window__wrapper = document.querySelector(".add__task__window__wrapper"),
          
          set__task__name = document.querySelector(".set__task__name"),
          task__name__OK__button = document.querySelector("#task__name__OK__button"),
          task__name__input = document.querySelector("#name"),

          set__task__color = document.querySelector(".set__task__color"),
          task__colors = document.querySelectorAll("th"),

          set__task__date = document.querySelector(".set__task__date"),
          task__date__OK__button = document.querySelector("#task__date__OK__button"),
          task__date__input = document.querySelector("#date"),


          set__task__time = document.querySelector(".set__task__time"),
          task__time__OK__button = document.querySelector("#task__time__OK__button"),
          task__time__input = document.querySelector("#time"), 

          set__task__notifications = document.querySelector(".set__task__notifications"),
          task__notifications__OK__button = document.querySelector("#task__notifications__OK__button"),
          
          notifications = set__task__notifications.querySelectorAll("input"),
          set__task__ready = document.querySelector(".set__task__ready");

    let name = "New task",
        color = "blue",
        date = "",
        time = "",
        notification_10min = true,
        notification_1hour = false,
        notification_1day = false;

    add__task__button.addEventListener("click", () => {toggleAddTask()} );

    function toggleAddTask() {
        event.preventDefault();

        add__task__button.classList.toggle("rotate");

        add__task__window__wrapper.classList.toggle("hide");
        content.classList.toggle("hide"); 
        
        if (set__task__name.classList.contains("hide")) {
            set__task__name.classList.toggle("hide");
            toDo.innerHTML = "New task";
        }
        else {
            toDo.innerHTML = "To Do List";
            set__task__name.classList.toggle("hide");
        }
    }

    task__name__OK__button.addEventListener("click", (event) => {
        event.preventDefault();

        name = task__name__input.value;

        set__task__name.classList.toggle("hide");
        set__task__color.classList.toggle("hide");
        task__name__input.value = "New Task";
    });

    task__colors.forEach(item => {
        item.addEventListener("click", (event) => {
            color = event.target.style.backgroundColor;

            set__task__color.classList.toggle("hide");
            if (date == "") {
                set__task__date.classList.toggle("hide");
            }
            else {
                set__task__time.classList.toggle("hide");
            }
        });
    });

    task__date__OK__button.addEventListener("click", (event) => {
        event.preventDefault();

        set__task__date.classList.toggle("hide");
        set__task__time.classList.toggle("hide");
    })

    task__time__OK__button.addEventListener("click", (event) => {
        event.preventDefault();

        time = task__time__input.value;

        set__task__time.classList.toggle("hide");
        set__task__notifications.classList.toggle("hide");
        task__time__input.value = "";
    });

    task__notifications__OK__button.addEventListener("click", (event) => {
        event.preventDefault();

        toDo.innerHTML = "To Do List";

        notification_10min = notifications[0].checked;
        notification_1hour = notifications[1].checked;
        notification_1day = notifications[2].checked;

        set__task__notifications.classList.toggle("hide");
        set__task__ready.classList.toggle("hide");

        //task = new Task(name, color, date, time, notification_10min, notification_1hour, notification_1day);

        task = document.createElement("div");
        task.innerHTML = `
            <div class="task">
                <div style="background-color: ${color}" class="task__color">
                    <a href=""></a>
                </div>

                <div class="task__name">
                    <p class="task__text">${name}</p>
                </div>

                <div class="task__date">
                    <p>${date}</p>
                </div>
                
                <div class="task__time">
                    <p>${time}</p>
                </div>
            </div>
        `
        content.append(task);

        date = "";
        set__task__ready.classList.toggle("hide");
        content.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");
        add__task__button.classList.toggle("rotate");

        // setTimeout(() => {
        //     set__task__ready.classList.toggle("hide");
        //     content.classList.toggle("hide");
        // }, 5000);

    });

    //DELETE TASK
    // const delete__task__button = document.querySelectorAll(".delete__task__button");

    // delete__task__button.forEach(item => {
    //     item.addEventListener("click", (event) => {
    //         console.log("123");
    //     })
    // });


    //CALENDAR 
    const calendar__currentMonth = document.querySelector(".calendar__currentMonth"),
          calendar__previousMonth = document.querySelector(".calendar__previousMonth"),
          calendar__nextMonth = document.querySelector(".calendar__nextMonth"),
          calendar__days = document.querySelector(".calendar__days");

          currentDate = new Date();
          months = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
    let days,
        exportMonth;

    function buildCalendar () {
        let mm = currentDate.getMonth(),
            yy = currentDate.getFullYear(),

            currentMonth = months[mm];

        exportMonth = mm+1;
        if (exportMonth < 10) {
            exportMonth = "0" + exportMonth;
        };

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
            days.innerHTML += `<div>${i}</div>`;
        };  // add all days

        for (i = 1; i <= 7 - lastDayIndex; i++) {
            days.innerHTML += `<div class="calendar__anotherMonth">${i}</div>`;
        };
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
            myFunction(event.target.innerHTML);
        }
    });

    function myFunction(clickedDay) {
        if (clickedDay < 10) {
            clickedDay = "0" + clickedDay;
        }
        date = clickedDay + "." + exportMonth;
        toggleAddTask();
    };
                
});