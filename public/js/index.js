const weatherForm = document.querySelector('#settings-form');
const STATE = {
    currently: '',
    daily: '',
    geoData: ''
}

const CONSTANTS = {
    INTERVAL: 1200000   // 20 minutes
}



// Fetches Data and Sets STATE
const fetchData = () => {
    const address = document.querySelector('#address');

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




