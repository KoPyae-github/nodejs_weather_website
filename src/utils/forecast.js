const request = require("request");

let accessKey = "e3afe8e175073a3041c248330152c856";
const baseURL = "http://api.weatherstack.com/";

// Forecast
const forecast = (q1, q2, unit, callback) => {
    let url = `${baseURL}current?access_key=${accessKey}&query=${q1},${q2}&units=${unit}`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {      // low Level OS Errors such as connectivity
            callback("Unable to connect weather services", { temperature, feelslike } = {}); // For Object Destruction, deault value must be declared.
        } else if (body.error) {
            let data = body.error;
            callback(data.info, { temperature, feelslike } = {});
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            });
        }
    });
}

module.exports = {
    forecast: forecast,
};