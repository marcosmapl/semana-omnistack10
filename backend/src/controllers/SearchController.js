const Developer = require('../models/Developer');
const parseStringToArray = require('../utils/parseStringToArray');

module.exports = {
  async index(request, response) {
    // buscar devs num raio X km
    // filtrar por tecnologias
    console.log(request.query);
    const { latitude, longitude, techs, maxDist = 5000 } = request.query;

    const techsArray = parseStringToArray(techs);

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

    return response.json({ devs });
  }
}