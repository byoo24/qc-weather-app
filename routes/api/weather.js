const express = require('express');
const router = express.Router();

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');


router.post('', (req, res) => {
    const { address } = req.body;

    geocode(address, (error, geoData) => {
        if (error) {
            return res.json({ error });
        }

        forecast(geoData, (error, forecastData) => {
            if (error) {
                return res.json({ error });
            }

            return res.json(forecastData);
        })
    })
});



module.exports = router;