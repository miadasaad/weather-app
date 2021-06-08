
/*PS C: \Program Files\nodejs > .\node - v
v14.15.4
PS C: \Program Files\nodejs >*/
// Express to run server and routes
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const port = 3004;

// Start up an instance of app
const app = express();

/* Dependencies */

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));


const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) });

// using get routes
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// using post routes
app.post('/postInfo', (req, res) => {
    projectData = {
        temp: req.body.mytemp,
        date: req.body.mydate,
        content: req.body.myfeel
    };

    res.send(projectData);
    console.log(projectData);
})