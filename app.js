const path = require('path');
const express = require('express');
const weatherRoute = require('./routes/api/weather');


const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');


// Setup static directory to server
app.use(express.static(publicDirectoryPath));


// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// API Settings Route
app.use('/api/v1/weather', weatherRoute);


// Home Page
app.get('', (req, res) => {
    res.render('index');
});


// 404 Page
app.get('*', (req, res) => {
    res.send('My 404 Page');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

