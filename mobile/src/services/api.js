import axios from 'axios';

//exp://y5-u5i.anonymous.mobile.exp.direct:80
const api = axios.create({
  baseURL: 'http://192.168.0.56:3333',
});

export default api;