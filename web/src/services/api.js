import axios from 'axios';

/**
 * Creates a HTTP client to our backend application
 * If Frontend is not running on the same server of Backend
 * change {baseURL} address to Backend network address
 */
const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;