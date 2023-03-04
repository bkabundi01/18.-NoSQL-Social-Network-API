//add express, connection, and the routes 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//set up server and the port number
const app = express();
const port = process.env.PORT || 3001;

//allowing the use of the data from response
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//calling the routes; url here is localhost:3001
app.use(routes);

//connecting to mongoDB and starting the server
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server starting on port ${port}....Now listening....`);
    });
});