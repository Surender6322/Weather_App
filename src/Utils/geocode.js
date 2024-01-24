const request = require("postman-request")

const geoCode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWFwYm94LTAwIiwiYSI6ImNsbHVxa3pkNDFwNDEzZXRoZGhrM25ucDcifQ.wU7C9nu7fUULTRwn-j8Qhw&limit=1"
    request({url,json:true},(error,{body})=>{
        // console.log(response.body);
        if(error){
            callback("Network Issue!")
        }else if(body.features.length===0){
            callback("Result not found, Try another city!")
        }else{
            callback(undefined,{
                Latitude:body.features[0].center[1],
                Longitude:body.features[0].center[0],
                Location:body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode