const path = require('path'); // Core Node Module
const express = require('express'); // NPM Module
const hbs = require('hbs');
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();

console.log(__dirname);
console.log(__filename);

// Define paths for Express Config
let publicPath = path.join(__dirname, "../public");  // Join --driname with ../public
let viewsPath = path.join(__dirname, "../templates/views");  // Customize Views Path
let partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('views', viewsPath); // Set Views Path
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

// Setup Static Directory to Serve
app.use(express.static(publicPath)); // Call Static Pages using filename like http://localhost:3000/index.html or http://localhost:3000

app.get('', (req, res) => {
    // res.send("<h1>Welcome to HTML Page using Express!</h1>"); // HTML Page
    res.render("index", {
        title: "Weather",
        name: "Ko Pyae",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Ko Pyae",
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "What can I help you?",
        name: "Ko Pyae",
    });
})

// app.get('/help', (req, res) => {
//     res.send([     // Object changes automatically into JSON Format
//         {
//             userName: "Mio",
//             usrAge: 21,
//         },
//         {
//             userName: "Miya",
//             usrAge: 22,
//         }]);
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: "You must provide an address.",
        })
    }

    let address = req.query.address;
    let unit = "m";
    geoFunction(address, unit, res);
});

geoFunction = (address, unit, res) => {
    geocode(address, (err, { latitude, longtitude, location }) => {
        if (err) {
            return res.send({ err });
        }

        forecast(latitude, longtitude, unit, (err, { temperature, feelslike }) => {
            if (err) {
                return res.send({ err });
            }

            res.send({
                coordinateMessage: `The Coordinates of ${location} are ${latitude}, ${longtitude}.`,
                forecastMessage: `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`,
                location,
                address,
            })
        })
    });
}

app.get("/products", (req, res) => {    // Info about query string lives on request
    if (!req.query.search) {
        return res.send({ err: "You must provide a serach term." }); //  Since http req is a single req and a single res
    }  // make else or return 
    console.log(req.query.search);
    res.send({
        products: [

        ]
    });
});

// 404 handler with specific pattern
app.get("/help/*/", (req, res) => {
    res.render("404", {
        title: "404",
        errMessage: "Help Articles Not Found",
        name: "Ko Pyae",
    });
});

// 404 handler should be the last request because Express stops matching when matches are found
app.get("*", (req, res) => {    // * means every route
    res.render("404", {
        title: "404",
        errMessage: "Page Not Found",
        name: "Ko Pyae",
    });
});

app.listen(3000, () => {
    console.log("Server is running up on port 3000!");
});
