const Developer = require('../models/Developer');
const parseStringToArray = require('../utils/parseStringToArray');

/**
 * Controller to index (list) Developers in an area of 10 kilometers.
 */
module.exports = {
  async index(request, response) {
    
    // gets search area coordinates
    // techs - String of all desired technologies separated by comma
    // maxDist - max distance radius um meters.
    const { latitude, longitude, techs, maxDist = 10000 } = request.query;

    // creates new array with all desired technologies
    const techsArray = parseStringToArray(techs);

    // find all developers that have all requirements (distance and techs)
    const devs = await Developer.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry : {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDist,
        },
      },
    });

    // returns a new object with an array of all found developers
    return response.json({ devs });
  }
}