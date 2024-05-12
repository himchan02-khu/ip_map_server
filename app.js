const express = require("express");
const axios = require("axios");
const app = express();
const port = 4242;
const token = "0d72321f5ba3d2";
const url = require("url");
// const http = require("http");
// const {router} = require("express/lib/application");


app.listen(port, () => {
    console.log(`root : http://localhost:${port}`);
    console.log(`Server is running at http://localhost:${port}`);
});
// Login page route
app.get('/search', async (req, res) => {
    try {
        const query = url.parse(req.url, true).query;
        const response = await ipinfo(query.ip);
        // const info = await Promise.all(
        //     response.data.map(async (item) => {
        //         ip: item.ip;
        //         city: item.city;
        //         country: item.country;
        //         region: item.region;
        //
        //     })
        // )
        if (response.ip == null)
            return res.status(404).send("No ip found.");
        return res.json(response);
    } catch (error) {
        console.log(error);
        return res.status(404).send("Not Found");
    }
});

// app.get('/myip', async (req, res) => {
//     try {
//         const response = await axios.get("https://api.ip.pe.kr/json");
//         const ip = response?.ip;
//         const responsedata = {ip};
//         console.log(`MyIP: ${ip}`);
//         return res.json(responsedata);
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// })

async function ipinfo(IPaddress) {
    try {
        const response = await axios.get("https://ipinfo.io/"
            + IPaddress
            + "?token="
            + token);
        const info = response?.data;
        const ip = info?.ip;
        const city = info?.city;
        const region = info?.region;
        const country = info?.country;
        const address = info?.loc;
        const telecom = info?.org;
        const postal = info?.postal;
        const time = info?.timezone;
        const resposedata = { ip, city, region, country, address, telecom, postal, time };
        console.log(resposedata);
        return resposedata;
    }
    catch (error) {
        console.log("ip주소 에러",error);
        return {};
    }
}
//
//
// function initMap() {
//     const geocoder = new google.maps.Geocoder();
//     const map = document.querySelector('gmp-map').innerMap;
//     const infoWindow = new google.maps.InfoWindow();
//
//     document.getElementById('submit').addEventListener('click', () => {
//         geocodeLatLng(geocoder, map, infoWindow);
//     });
// }
//
// async function geocodeLatLng(geocoder, map, infoWindow) {
//     const input = document.getElementById('latlng').value;
//     const latlngStr = input.split(',', 2);
//     const latlng = {
//         lat: parseFloat(latlngStr[0]),
//         lng: parseFloat(latlngStr[1]),
//     };
//
//     try {
//         const response = await geocoder.geocode({location: latlng});
//         const marker = document.querySelector('gmp-advanced-marker');
//
//         map.setZoom(11);
//         marker.position = latlng;
//         infoWindow.setContent(response.results[0].formatted_address);
//         infoWindow.open({anchor: marker});
//     } catch (e) {
//         window.alert(`Geocoder failed due to: ${e}`);
//     }
// }
//
// window.initMap = initMap;