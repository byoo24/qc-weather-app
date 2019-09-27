const request = require('request');
const { DARK_SKY_KEY } = require('../../config/settings');


// DARKSKY WEATHER API
// https://darksky.net/dev/docs#forecast-request
const forecast = (geoData, callback) => {
    const { latitude, longitude } = geoData;
    const darksky_url = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${latitude},${longitude}`;

    request({ url: darksky_url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (response.body.error) {
            callback('Unable to find location.');
        } else {
            callback(undefined, {
                geoData,
                currently: response.body.currently,
                daily: response.body.daily
            });
        }
    });
}


module.exports = forecast;