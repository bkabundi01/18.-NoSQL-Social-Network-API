//add express, connection, and the routes 
const express = require('express');
const db = require('./config.connection');
const routes = require('./routes');

//set up server and the port number
const app = express();
const port = process.env.PORT || 3001;