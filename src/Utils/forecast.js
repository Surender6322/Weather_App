const request = require("postman-request")

const forecast = (x,y,callback)=>{
  const url = "http://api.weatherstack.com/current?access_key=4b1485c87b2c74575204d748a8da0c4d&query="+x+","+y
  request({url,json : true},(error,{body})=>{
    if(error){
      callback("Network Issue!")
    }else if(body.error){
      callback("Are you from the Earth, give me some real cities.")
    }else{
      callback(undefined,"Weather is "+body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out, feels like "+body.current.feelslike+" degrees out.")
    }
  })
}

module.exports = forecast