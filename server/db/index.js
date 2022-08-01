const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const Section = require('./models/Section');
const Template = require('./models/Template');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + process.env.MONGO_URL);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err);
});

module.exports = {
  User,
  Section,
  Project,
  Template,
};