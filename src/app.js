const path = require("path");
const express = require("express");
const hbs = require('hbs');
const request = require("postman-request")
const forecast = require('./Utils/forecast.js')
const geocode = require('./Utils/geocode.js')

const app = express()

// paths directories for express config
const viewspath=path.join(__dirname,"../templates/views")
const publicDirectory = path.join(__dirname,"../public")
const partialspath = path.join(__dirname,"../templates/partials")


//setup handlebars engine and views location
app.set("views",viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectory))

// app.get("",(req,res)=>{
//     res.send("Hello Express!!")
// })

// console.log(path.join(__dirname,"../public"))

app.get("",(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Surender"
    })
})
app.get("/help",(req,res)=>{
    res.render('help',{
        title: 'Help Guide',
        HP:"I am here for your help. Drop your questions down below I'll look into them :)",
        name: "Surender"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        about:"About the weather app.",
        name:"Surender"
    })
})
// app.get("/weather",(req,res)=>{
//     res.send({
//         Forecast : 50,
//         Location : "Gurgaon"
//     })
// })
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide address"
        })
    }
    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(Latitude,Longitude, (error, forecastdata) => {
            if(error){
                return res.send({error});
            }
            res.send({
                Address: req.query.address,
                Location,
                Weather:forecastdata
            })
        })
    })
})

app.get("/help/*",(req,res)=>{
    res.render("error404",{
        title:"ERROR 404",
        message:"Help article not found!!",
        name: "Surender"
    })
})

app.get('*',(req,res)=>{
    res.render("error404",{
        title:"ERROR 404!",
        message:"Page not found!",
        name: "Surender"
    })
})

app.listen(3000,()=>{
    console.log("Local Host 3K")
})