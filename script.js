document.addEventListener('DOMContentLoaded', () => {

    const days = document.querySelector('.days'),
          hours = document.querySelector('.hours'),
          minutes = document.querySelector('.minutes'),
          seconds = document.querySelector('.seconds');

    function timeRemaining () {
        const t = (Date.parse('01.01.2021') - Date.parse(Date())),
              days = Math.floor(t / 1000 / 60 / 60 / 24),
              hours = Math.floor((t / 1000 / 60 / 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
    
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function updateClock() {
        days.innerHTML = timeRemaining().days;
        hours.innerHTML = timeRemaining().hours;
        minutes.innerHTML = timeRemaining().minutes;
        seconds.innerHTML = timeRemaining().seconds;

        setTimeout(updateClock, 1000);
    }

    updateClock();

    const bonus_button = document.querySelector('#bonus'),
          bonus_video = document.querySelector('#bonus_video');

    bonus_button.addEventListener('click', () => {
        bonus_video.classList.remove('hidden');
        bonus_video.play();
    });

    const popup = document.querySelector('.popup'),
          close_button = document.querySelector('#close');

    setTimeout(function() {
        popup.classList.remove('hidden');
    }, 7000);

    close_button.addEventListener('click', () => {
        popup.classList.add('hidden');
    })
});