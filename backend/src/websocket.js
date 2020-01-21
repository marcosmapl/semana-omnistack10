const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringToArray');

const calculateDistance = require('./utils/calculateDistance');

// all active connections
// TODO: migrate all active connections to database
const connections = [];

let io;

exports.setupWebsocket = (server) => {
  io = socketio(server);

  // adds a event listen to function 'onconnection'
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

//
exports.findConnections = (devCoordinates, devTechs) => {
  return connections.filter(connection => {
    return calculateDistance(devCoordinates, connection.coordinates) < 10
      && connection.techs.some(tech => devTechs.includes(tech));
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};