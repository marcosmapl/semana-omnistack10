const axios = require('axios');
const Developer = require('../models/Developer');
const parseStringToArray = require('../utils/parseStringToArray');

const { findConnections, sendMessage } = require('../websocket');

/**
 * Controller to index, show, store, update and destroy Developers
 * It implements methods for:
 *    - Get all developers
 *    - Register a new developer into database
 *    - Notify all interested clients that there is a new developer to show on map
 */
module.exports = {
  async index(request, response) {
    // gets all developers
    const devs = await Developer.find();
    return response.json(devs);
  },
  async store(request, response) {
    // register a new developer into database (mongodb)

    // gets developer info
    const { github_username, techs, latitude, longitude } = request.body;
    
    // check if the developer exists in database
    let dev = await Developer.findOne({ github_username });
    if (!dev) {
      // if not exists, register into database

      // techs is a 'string' with all technologies separated by 'comma'
      // the function 'parseStringToArray' create a new Array of Technologies
      const techs_array = parseStringToArray(techs);

      // does a request to 'GitHub' api to get user info, passing 'github_username'.
      const github_response = await axios.get(`https://api.github.com/users/${github_username}`);

      // gets github user data
      const { id, name = login, avatar_url, html_url, bio, email } = github_response.data;

      // creates a location object for save user coordinates into database
      // @see https://docs.mongodb.com/manual/geospatial-queries/
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      console.log('new dev created');
      console.log(latitude+', '+longitude);

      // register the new Developer into database
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
      // find all connected clients that:
      // * the new 'developer' coordinates are 10km near of client coordinates
      // * the new 'developer' have any of required 'technologies' 
      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude,
        },
        techs_array,
      );
      
      // notify each found client, that there is a new developer to show on map
      sendMessage(sendSocketMessageTo, 'new-developer', dev);
    }

    // return new developer data
    return response.json(dev);
  }
}