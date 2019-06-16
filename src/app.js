const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for express: Static and views
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Maddin'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Maddin'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Maddin',
        message: 'Wenn Du nicht mehr weiter weißt, lausche wie ein Kobold scheißt!'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'Not found!',
        errorMessage: 'Help specific page not found',
        name: 'Maddin'
    })
})

app.get('*', (req,res)=> {
    res.render('404',{
        title:'Not found!',
        errorMessage: 'Page not found!',
        name: 'Maddin'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})