const request = require('request')

//create a function that gets the forecast 
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fc73d943a7187e0d17192b37a9a090c3&query=' + latitude + ',' + longitude + '&units=m'

    //using Shorthand: instead of writing url: url write just url
    //also DESTRUCTURING instead of writing response after error as a parameter we will use {body}
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            //callback function expects 2 arguments
            //first the error and second the data
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else { 
                callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
            }
    })
}

module.exports = forecast