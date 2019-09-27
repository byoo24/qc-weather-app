// Settings
const toggle = document.querySelector('#settings-toggle');
const settings = document.querySelector('#settings');

toggle.addEventListener('click', () => {
    settings.classList.toggle('active');

    let swapText = toggle.innerHTML;
    toggle.innerHTML = toggle.getAttribute('data-text-swap');
    toggle.setAttribute('data-text-swap', swapText);
});





// Change screen size
const weather_container = document.querySelector('.weather-container');
const selections = document.querySelectorAll('input[name=screen-size]');


selections.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.checked) {
            weather_container.className = 'weather-container';
            weather_container.classList.add(this.value);
        }
    })
})





