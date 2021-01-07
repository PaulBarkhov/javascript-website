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
    const add__task__button = document.querySelector(".add__task__button"),
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

        add__task__button.addEventListener("click", (event) => {
            event.preventDefault();

            add__task__button.classList.toggle("rotate");

            add__task__window__wrapper.classList.toggle("hide");
            content.classList.toggle("hide"); 
            
            if (set__task__name.classList.contains("hide")) {
                set__task__name.classList.toggle("hide");
            }
        });

        task__name__OK__button.addEventListener("click", (event) => {
            event.preventDefault();

            name = task__name__input.value;
            console.log(`Task name is ${name}`);

            set__task__name.classList.toggle("hide");
            set__task__color.classList.toggle("hide");
            task__name__input.value = "New Task";
        });

        task__colors.forEach(item => {
            item.addEventListener("click", (event) => {
                color = event.target.style.backgroundColor;
                console.log(`Task color is ${color}`);

                set__task__color.classList.toggle("hide");
                set__task__date.classList.toggle("hide");

                let currentDate = new Date(),
                dd = currentDate.getDate(),
                mm = currentDate.getMonth() + 1,
                yy = currentDate.getFullYear();
        
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
        
                let today = `${yy}-${mm}-${dd}`;
    
                task__date__input.value = today;
            });
        });

        task__date__OK__button.addEventListener("click", (event) => {
            event.preventDefault();

            date = task__date__input.value;
            date = date[8] + date[9] + '.' + date[5] + date[6];
            console.log(`Task date is ${date}`);

            set__task__date.classList.toggle("hide");
            set__task__time.classList.toggle("hide");
        })

        task__time__OK__button.addEventListener("click", (event) => {
            event.preventDefault();

            time = task__time__input.value;
            console.log(`Task time is ${time}`);

            set__task__time.classList.toggle("hide");
            set__task__notifications.classList.toggle("hide");
            task__time__input.value = "";
        });

        task__notifications__OK__button.addEventListener("click", (event) => {
            event.preventDefault();

            notification_10min = notifications[0].checked;
            notification_1hour = notifications[1].checked;
            notification_1day = notifications[2].checked;

            console.log(`Task notification 10 min is ${notification_10min}`);
            console.log(`Task notification 1 hour is ${notification_1hour}`);
            console.log(`Task notification 1 day is ${notification_1day}`);

            set__task__notifications.classList.toggle("hide");
            set__task__ready.classList.toggle("hide");

            //task = new Task(name, color, date, time, notification_10min, notification_1hour, notification_1day);





            task = document.createElement("div");
            task.innerHTML = `
                <hr>
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

                    <div class="task__status">
                        <input class="done" type="radio">
                    </div>
                </div>
                <hr>
            `
            content.append(task);

            set__task__ready.classList.toggle("hide");
            content.classList.toggle("hide");
            add__task__window__wrapper.classList.toggle("hide");
            add__task__button.classList.toggle("rotate");

            // setTimeout(() => {
            //     set__task__ready.classList.toggle("hide");
            //     content.classList.toggle("hide");
            // }, 5000);

        });
        
});