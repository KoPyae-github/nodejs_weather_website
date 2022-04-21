console.log("Client side java script file is loaded!");

// let urlShan = "https://v3.shankoemee.com/v3/8packagepromo/getPackageStatus?token=4904047245-f1831c18-fd9b-494d-81be-7b0d9002d1f7&userId=4904047245";
// let urlPuzzle = "https://puzzle.mead.io/puzzle"
// fetch(urlPuzzle).then((response) => { // Fetch is Browser based API only work in client side js
//     response.json().then((data) => {
//         console.log(data);
//     })
// });

// let address = "Yangon";
// let access_Token = "pk.eyJ1Ijoia29weWFlMDAxMSIsImEiOiJjbDFmYjFhYWcwdmZjM3FuczJkNGdxcXkwIn0.Zxw-fwfTYP32PoNTP0DKyA";
// let limit = 1;
// let geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_Token}&limit=${limit}`;

// fetch(geoURL).then((response) => {
//     response.json().then((data) => {
//         let q1 = data.features[0].center[1];
//         let q2 = data.features[0].center[0];
//         let accessKey = "e3afe8e175073a3041c248330152c856";
//         let baseURL = "http://api.weatherstack.com/";
//         let unit = "m";
//         let forecastUrl = `${baseURL}current?access_key=${accessKey}&query=${q1},${q2}&units=${unit}`;

//         fetch(forecastUrl).then((response) => {
//             response.json().then((data) => {
//                 console.log(data.current.temperature, data.current.feelslike);
//             });
//         });
//     })
// });

let generateForecast = (address) => {
    let urlLH = "http://localhost:3000/weather?address=" + address;
    fetch(urlLH).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                msg1.textContent = data.err;
            } else {
                msg1.textContent = data.address;
                msg2.textContent = data.location;
                msg3.textContent = data.coordinateMessage;
                msg4.textContent = data.forecastMessage;
            }
        })
    });
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

let msg1 = document.querySelector("#message_1");
let msg2 = document.querySelector("#message_2");
let msg3 = document.querySelector("#message_3");
let msg4 = document.querySelector("#message_4");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent Refresh the web page

    msg1.textContent = "Loading...";
    msg2.textContent = "";
    msg3.textContent = "";
    msg4.textContent = "";
    let address = search.value;
    generateForecast(address);
})


