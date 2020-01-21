const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Point Model Objet for MongoDB Geospacial Queries
 * @see https://docs.mongodb.com/manual/geospatial-queries/
 */
const PointSchema = new Schema({
  type: {
    type: Schema.Types.String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  }
});

module.exports = PointSchema;