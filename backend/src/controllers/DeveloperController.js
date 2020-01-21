const axios = require('axios');
const Developer = require('../models/Developer');
const parseStringToArray = require('../utils/parseStringToArray');

const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Developer.find();
    return response.json(devs);
  },
  async store(request, response) {

    // desconstroi o 'request' e obtem o nome de usuário do github
    const { github_username, techs, latitude, longitude } = request.body;
    
    let dev = await Developer.findOne({ github_username });

    if (!dev) {
      const techs_array = parseStringToArray(techs);

      // uso de 'crase' no lugar de 'aspas simples' permite uso de template Strings
      const github_response = await axios.get(`https://api.github.com/users/${github_username}`);

      const { id, name = login, avatar_url, html_url, bio, email } = github_response.data;

      // mongoDB usa primeiro a longitude e depois latitude
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      console.log('new dev created');
      console.log(latitude+', '+longitude);

      // como o nome das variáveis já é o mesmo dos atribuitos, não precisa de ':'
      // isso é chamado de short syntax
      dev = await Developer.create({
        github_id: id,
        name,
        github_username,
        email,
        avatar_url,
        html_url,
        bio,
        location,
        techs: techs_array
      });

      // every time a new 'developer' is created
      // verify for all connected clients if:
      // * the new 'developer' coordinates are 10km near of client coordinates
      // * the new 'developer' have any of required 'technologies'
      // if true, send 'developer' data to client 
      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude,
        },
        techs_array,
      );

      sendMessage(sendSocketMessageTo, 'new-developer', dev);
    }

    return response.json(dev);
  }
}