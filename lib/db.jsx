const mongoose = require('mongoose');
const User = require('../models/User.model')
const Event = require('../models/Event.model')


const connectDb = () => {
  if (mongoose.connection.readyState !== 0) return;
  return mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}


const models = { User, Event }

module.exports = {models, connectDb}