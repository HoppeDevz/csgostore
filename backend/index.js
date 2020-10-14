const axios = require("axios");
const express = require("express");
const app = require("express")();
const cors = require("cors");

const routes = require('./src/Routes');

app.listen(27077, () => {
    console.log("Backend is running in port 27077");
});

app.use(cors());
app.use(express.json());
app.use(routes);

// => https://community.cloudflare.steamstatic.com/economy/image/{res.data.descriptions.icon_url_large};
// => res.data.descriptions.market_name;
// => 

//axios.default.get("http://steamcommunity.com/inventory/76561199003816734/730/2?l=brazilian&count=5000").then(response => {
    //console.log(response.data.descriptions);
//});