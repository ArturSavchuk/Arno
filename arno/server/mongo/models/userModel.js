const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [{
    win: {
      type: Boolean,
      required: true,
    },
    song: {
      type: Schema.Types.ObjectId,
      ref: 'Song',
      required: true,
    },
    tries: {
      type: Number,
      required: true,
    },
    offered: [{
      type: Schema.Types.ObjectId,
      ref: 'Song',
      required: true,
    }]
  }],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'event',
    },
  ],
});

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

module.exports = mongoose.model('user', userSchema);
