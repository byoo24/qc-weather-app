const weather = {
    'clear-day': '/images/icons/0001_clear_day.svg',
    'clear-night': '/images/icons/0002_clear_night.svg',
    'rain': '/images/icons/0003_rain.svg',
    'snow': '/images/icons/0004_snow.svg',
    'sleet': '/images/icons/0005_sleet.svg',
    'wind': '/images/icons/0006_wind.svg',
    'fog': '/images/icons/0007_fog.svg',
    'cloudy': '/images/icons/0008_cloudy.svg',
    'partly-cloudy-day': '/images/icons/0009_partly_cloudy_day.svg',
    'partly-cloudy-night': '/images/icons/0010_partly_cloudy_night.svg',
}


const weekday = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}




const htmlCurrentWeather = (currently, mainSummary) => {
    const { time, icon, temperature, humidity, windSpeed, summary } = currently;

    const dateData = new Date(time * 1000);
    const month = dateData.getMonth() + 1; // January returns 0
    const day = dateData.getDate();
    const year = dateData.getFullYear();
    const date = `${month}/${day}/${year}`;

    const screen = document.querySelector('.screen-current');


    while(screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }


    // Create date row
    const div1 = document.createElement('div');
        div1.classList.add('row', 'animated', 'fadeInUp');
    const h1 = document.createElement('h1');
        h1.classList.add('current-date');
        h1.innerText = date;
    div1.appendChild(h1);


    // Create image and temp row
    const div2 = document.createElement('div');
        div2.classList.add('row', 'animated', 'fadeInUp');
    const image = new Image();
        const imgSrc = weather[icon] ? weather[icon] : weather['partly-cloudy-day'];
        image.classList.add('current-img');
        image.src = imgSrc;
    const temp = document.createElement('span');
        temp.classList.add('current-temp');
        temp.innerText = temperature;
    div2.appendChild(image);
    div2.appendChild(temp);


    // Create summary, humidity, and wind row
    const div3 = document.createElement('div');
        div3.classList.add('row', 'animated', 'fadeInUp');
    const currentSummary = document.createElement('span');
        currentSummary.classList.add('current-summary');
        currentSummary.innerText = summary;
    const currentHumidity = document.createElement('span');
        currentHumidity.classList.add('current-humidity');
        currentHumidity.innerText = `Humidity: ${humidity}`;
    const currentWind = document.createElement('span');
        currentWind.classList.add('current-wind');
        currentWind.innerText = `Wind Speed: ${windSpeed}`;
    div3.appendChild(currentSummary);
    div3.appendChild(currentHumidity);
    div3.appendChild(currentWind);


    // Create summary row
    const div4 = document.createElement('div');
        div4.classList.add('row', 'animated', 'fadeInUp');
    const weekSummary = document.createElement('span');
        weekSummary.classList.add('summary');
        weekSummary.innerText = mainSummary;
    div4.appendChild(weekSummary);


    screen.appendChild(div1);
    screen.appendChild(div2);
    screen.appendChild(div3);
    screen.appendChild(div4);
}




const htmlWeekWeather = (daily) => {
    const screen = document.querySelector('.screen-week');
    const { data } = daily;

    while (screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }

    for (let i = 1; i < 6; i++) {
        const delay = 100 * i;
        const day = data[i];
        const { icon, temperatureHigh, temperatureLow, time } = day;

        const date = new Date(time * 1000);


        // Create upcoming forecast
        const div = document.createElement('div');
            div.classList.add('daily', 'animated', 'fadeInRight');
        const h1 = document.createElement('h1');
            h1.classList.add('daily-day');
            h1.innerText = weekday[date.getDay()];
        const image = new Image();
            const imgSrc = weather[icon] ? weather[icon] : weather['partly-cloudy-day'];
            image.classList.add('daily-img');
            image.src = imgSrc;
        const span1 = document.createElement('span');
            span1.classList.add('daily-temp-high');
            span1.innerText = temperatureHigh;
        const span2 = document.createElement('span');
            span2.classList.add('daily-temp-low');
            span2.innerText = temperatureLow;
        div.appendChild(h1);
        div.appendChild(image);
        div.appendChild(span1);
        div.appendChild(span2);

        setTimeout(() => {
            screen.appendChild(div);
        }, delay);
    }
}