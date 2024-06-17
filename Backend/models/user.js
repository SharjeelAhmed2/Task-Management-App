const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfo: { type: String },
  fullName: { type: String },
  email: { 
    type: String,
    validate: {
      validator: function(v) {
        return /\b[A-Z0-9._%+-]+@(?:gmail|outlook)\.com\b/i.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  profilePicture: { type: String }
});

module.exports = mongoose.model('user', userSchema)