const express = require('express');
const path = require('path');
const hbs = require('hbs');
const coordinates = require('./../../weather/app.js')
const weather = require('./../../weather/weather.js');
const { response } = require('express');

const app = express();

const staticContentDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticContentDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        userName: 'Gouse',
        name: 'Shaik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shaik',
        message: 'Happy to Help :)'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help Article Not Found!'
    })
})

app.get('/weather', (req, res) => {
    debugger;
    if(!req.query.city) {
        return res.send({
            error: 'City is required!'
        })
    }
    coordinates(req.query.city, (error, data) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        const coordinates = data.longitude + "," + data.latitude;
        console.log(coordinates);
        weather(coordinates, (error1, data1) => {
            if(error1) {
                console.log(error1);
            } 
            return res.send(data1) 
        })
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page Not Found!'
    })
})


app.listen(3000, () => {
    console.log('Service is running on port 3000');
})