const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
   
    
    const query =  req.body.cityName;
    const apiKey = "a4595747f46ece2f5c87cb9659a40b69";
    const unit = "metric"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description;
            const iconImageUrl = "http://openweathermap.org/img/wn/04n@2x.png"
            res.write("<h1>The weather in " + query+ " is currently " + desc + "</h1>");
            res.write("<h2>The Temperature is " + temp + " Degree Celsius. </h2>" );
            res.write("<img src=" + iconImageUrl+ ">")
            res.send()
        })
    })
});

app.listen(8082, function(){
    console.log("server running on port 8082")
});