import axios from 'axios';

/**
 * Creates a HTTP client to our backend application
 * If running via an emulator and your backend is running in a differente server
 * change {baseURL} to backend network address
 * If running into a mobile phone check if your phone have access to backend server
 */
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;