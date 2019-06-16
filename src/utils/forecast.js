const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/761f48dc2d2668076f457bb601ef236b/' + latitude + ',' + longitude + '?units=si&lang=de'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(body.error){
            callback(body.error, undefined)
        }
        else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast