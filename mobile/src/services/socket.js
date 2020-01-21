import socketio from 'socket.io-client';

// creates a new websocket client for backend server
// autoConnect false to avoid client auto connect when app starts
const socket = socketio('http://192.168.0.56:3333', {
  autoConnect: false,
});

function subscribeToNewDevepelopers(subscribeFunction) {
  socket.on('new-developer', subscribeFunction);
}

// create a new connection with websocket server
// sends to server the mobile app current region and searched techs
function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

// if the client is connected, then disconnect to serve
function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

// exports only the funcionst to encapsulate our client connection method 
export {
  connect,
  disconnect,
  subscribeToNewDevepelopers,
};