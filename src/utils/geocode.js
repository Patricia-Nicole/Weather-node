const request = require('request')

//define a function and call it ---> use callback function
//if use Asynchronous inside a function cannot use return statement
const geocode = (address, callback) => {
    // for program to not crash if user introduces other characters
    // for example: ? becomes %3F and that's why we use encodeURIComponent()
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF0cmluIiwiYSI6ImNrcTN6N3JrMDEzaGQybnFyNWJsd29pb3IifQ.hmAp74vuJH0onoRV_HzfzA&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            //callback function expects 2 arguments
            //first the error and second the data
            callback('Unable to connect to weather service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode