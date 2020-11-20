
document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        }); 

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    let deadLine = '11-25-2020';

    function getRemainingTime(deadLine) {
        let t = Date.parse(deadLine) - Date.parse(Date());

        let days = Math.floor(t / 1000 / 60 / 60 / 24),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds');

    function updateClock() {
        const t = getRemainingTime(deadLine);
        days.innerHTML = t.days;
        hours.innerHTML = t.hours;
        minutes.innerHTML = t.minutes;
        seconds.innerHTML = t.seconds;

        const clockTimeout = setTimeout(updateClock, 1000);

        if (t.total <= 0) {
            clearTimeout(clockTimeout);
        }

        addZerosToTimer(); 
    }

    updateClock();

    function addZerosToTimer() {
        if (days.innerHTML.length == 1) {
            days.innerHTML = '0' + days.innerHTML;
        }
        if (hours.innerHTML.length == 1) {
            hours.innerHTML = '0' + hours.innerHTML;
        }
        if (minutes.innerHTML.length == 1) {
            minutes.innerHTML = '0' + minutes.innerHTML;
        }
        if (seconds.innerHTML.length == 1) {
            seconds.innerHTML = '0' + seconds.innerHTML;
        }
    }

});