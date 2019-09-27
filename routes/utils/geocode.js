const request = require('request');
const { MAPBOX_KEY } = require('../../config/settings')


// MAPBOX GEOCODING
// https://docs.mapbox.com/api/search/
const geocode = (address, callback) => {
    const mapbox_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_KEY}&limit=1`;

    request({ url: mapbox_url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to geocoding service');
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.');
        } else {
            const data = response.body.features[0];
            const place_name = data.place_name;
            const text = data.text;
            const latitude = data.center[1];
            const longitude = data.center[0];

            callback(undefined, {
                place_name,
                text,
                latitude,
                longitude
            });
        }
    })
}


module.exports = geocode;