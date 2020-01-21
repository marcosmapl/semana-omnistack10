/**
 * Backend Project
 * Creates a new Express Application
 * Establish a new database connection using Mongoose
 * Allows external access from any origin via CORS
 * Define JSON format for data transfer
 * Sets application routes (endpoints)
 */

// express for routing
const express = require('express');

// mongoose for create a data object model to access MongoDB
const mongoose = require('mongoose');

// express cross-origin resource sharing module
const cors = require('cors');

// http module
const http = require('http');

// express routing module
const routes = require('./routes');

const { setupWebsocket } = require('./websocket');

// create a new express application
const app = express();

// gets HTTP server for real-time bidirectional communication
const server = http.Server(app);
// call a function to configure our websocket server
setupWebsocket(server);


// calls creatIndex for each defined index in our schema
mongoose.set('useCreateIndex', true);

// create a database connection
mongoose.connect('mongodb+srv://omnistack:0ministack@cluster0-bagiw.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// allows access from any origin
app.use(cors());

// use JSON for data trade
app.use(express.json());

// set our aplication routes (endpoints)
app.use(routes);

// starts out aplication on port 3333
server.listen(3333);