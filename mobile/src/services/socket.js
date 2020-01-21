import socketio from 'socket.io-client';

/**
 * Creates a new websocket client for backend server
 * autoConnect - 'false' to avoid client auto connect when app starts
 * If running via an emulator and your backend is running in a differente server
 * change {baseURL} to backend network address
 * If running into a mobile phone check if your phone have access to backend server
 */
const socket = socketio('http://localhost:3333', {
  autoConnect: false,
});

/**
 * binds a event listener function (subscribeFunction) to 'new-developer' event
 * 'new-developer' event is fired by backend when a new developer was registered
 */
function subscribeToNewDevepelopers(subscribeFunction) {
  socket.on('new-developer', subscribeFunction);
}

/**
 * Connects with backend
 * Sends mobile phone current position and desired techs for search
 */
function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

/**
 * If the mobile phone is connected with backend, then close the connection
 */
function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevepelopers,
};