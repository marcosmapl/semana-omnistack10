const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./utils/Point');

const DeveloperSchema = new Schema({
  github_id: Schema.Types.String,
  name: Schema.Types.String,
  github_username: Schema.Types.String,
  email: Schema.Types.String,
  bio: Schema.Types.String,
  avatar_url: Schema.Types.String,
  html_url: Schema.Types.String,
  location: Schema.Types.String,
  techs: [Schema.Types.String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
  //updated: { type: Date, default: Date.now() },
  //age: { type: Number, min: 18, max: 65, required: true },
});

module.exports = mongoose.model('Developer', DeveloperSchema);