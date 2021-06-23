const path = require('path')
const express = require('express')
//make the parshall --> to reuse code like for footer
const hbs = require('hbs')
//get function we need for geocode and forecast
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//the paths to directory and file
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

//call express function
const app = express()
//for heroku port
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

//setup HANDLEBARS ENGINE and VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//homepage by default will be index.html
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Patricia-Nicole Gal'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Patricia-Nicole Gal'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help message',
        title: 'Help page',
        name: 'Patricia-Nicole Gal'
    })
})

//weather page
app.get('/weather', (req, res) => {
    //ERROR HANDLING
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    //provided a default value for { latitude, longitude, location } = {} if this
    //would not be provided ---> would be undefined, but the return will show the error
    //'You must provide an address'
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//use wildcard character
app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Patricia-Nicole Gal',
        errorMessage: 'Help article not found'
    })
})

//for 404 pages
app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: 404,
        name: 'Patricia-Nicole Gal',
        errorMessage: 'Page not found'
    })
})

//start the server
app.listen(port, () => {
    console.log('server is up on port ' + port)
})