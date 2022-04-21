const request = require("request");

// Geocode
let access_Token = "pk.eyJ1Ijoia29weWFlMDAxMSIsImEiOiJjbDFmYjFhYWcwdmZjM3FuczJkNGdxcXkwIn0.Zxw-fwfTYP32PoNTP0DKyA";
let limit = 1;

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_Token}&limit=${limit}`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect geocoding services", { latitude, longtitude, location } = {}); // For Object Destruction, deault value must be declared.
        } else if (body.message) {
            callback(body.message, undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find Location. Try another search", { latitude, longtitude, location } = {});
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = {
    geocode: geocode,
};