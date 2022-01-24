const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    password_hash: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
