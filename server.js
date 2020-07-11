// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port,()=>{console.log(`Server Running on Port ${port}`)});

//GET Route Setup:
//Sends back the Project Data Object:
app.get('/add',((req,res)=>{
    console.log(`here from inside the Server GET`);
    res.send(projectData);
}))


//POST Route Setup:
app.post('/add', addWeather);

function addWeather (req,res){
    console.log(`here from inside the Server POST`);

    projectData.temperature = req.body.temperature;
    projectData.newDate = req.body.newDate;
    projectData.userResponse = req.body.userResponse;
    console.log(req.body);

    console.log(projectData);
};