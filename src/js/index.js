require('es6-promise').polyfill();
require('isomorphic-fetch');

const { htmlCurrentWeather, htmlWeekWeather } = require('./utils/weather');
const weather_container = document.querySelector('.weather-container');


const weatherForm = document.querySelector('#settings-form');
const STATE = {
    currently: '',
    daily: '',
    geoData: ''
}

const CONSTANTS = {
    INTERVAL: 1800000   // 30 minutes
}



// Fetches Data and Sets STATE
const fetchData = () => {
    const address = document.querySelector('[name="address"]');

    fetch('/api/v1/weather', {
        method: 'POST',
        body: JSON.stringify({
            address: address.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.text())
    .then(data => {
        const parseData = JSON.parse(data);
        const { currently, daily, geoData } = parseData;

        STATE.currently = currently;
        STATE.daily = daily;
        STATE.geoData = geoData;


        const { sunriseTime, sunsetTime } = daily.data[0];
        const currentTime = Date.now();

        if (currentTime < sunsetTime * 1000) {
            weather_container.classList.remove('sunset');
            weather_container.classList.add('sunrise');
        } else {
            weather_container.classList.remove('sunrise');
            weather_container.classList.add('sunset');
        }


        htmlCurrentWeather(currently, daily.summary);
        htmlWeekWeather(daily);
    });
}



// 30 minutes
fetchData() // Begin with fetching data
let timer = setInterval(() => fetchData(), CONSTANTS.INTERVAL);

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    clearInterval(timer);
    timer = setInterval(() => fetchData(), CONSTANTS.INTERVAL);
});




