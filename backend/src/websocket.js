const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringToArray');

const calculateDistance = require('./utils/calculateDistance');

// all active connections
// TODO: migrate all active connections to database
const connections = [];
let io;

/**
 * Server socket
 * Every time a new client connects, save the client into {connections} array.
 */
exports.setupWebsocket = (server) => {
  io = socketio(server);

  // adds a event listen to function 'onconnection' to save each new client connection
  io.on('connection', socket => {
    const { latitude, longitude, techs} = socket.handshake.query;
    
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
};

/**
 * Finds among all connections, those that are 10 km away from {devCoordinates}
 * and are searching for any of {devTechs}.
 */
exports.findConnections = (devCoordinates, devTechs) => {
  return connections.filter(connection => {
    return calculateDistance(devCoordinates, connection.coordinates) < 10
      && connection.techs.some(tech => devTechs.includes(tech));
  });
};

/**
 * Send a message and data to all clients.
 */
exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};