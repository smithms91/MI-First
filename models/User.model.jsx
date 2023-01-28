const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
  }
},
  { timestamps: true, strict: true },
);

let User;

try {
  User = mongoose.model('Users', UserSchema);
} catch {
  User = mongoose.models['Users'];
}

module.exports = User