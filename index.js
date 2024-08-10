const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {

    const data = req.body;
    const apiKey = "33baafe63307ed305145002fc7cb1b50";
    const unit = "metric";
    const query = data.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The weather in " + query + " is " + temp + " degree celsius</h1>");
            res.write("<p> The weather is currently " + desc + "</p>");
            res.write("<img src=" + iconURL + " />");
            res.send();
        })
    })
})

app.listen(3000, () => {
    console.log("server started on port: 3000");
})