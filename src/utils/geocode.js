const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibjAwYm1hc3RlciIsImEiOiJjand1eG5yb3owMDVvNGFxY2xhNTB3d2VkIn0.AwT6yoxSKL02gGJjaHFNLA&limit=1'

    request({url, json:true}, (error, {body})=> {
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(!body.features.length){
            callback('Unable to find Location', undefined)
        }
        else{
           callback(undefined, {
               latitude:body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
           })
        }
    })
}



module.exports = geocode