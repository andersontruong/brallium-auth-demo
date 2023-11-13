const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const UserSchema = new mongoose.Schema({
  firebaseId: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: false,
    default: Date.now()
  },
  email: {
    type: String,
    required: true
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;