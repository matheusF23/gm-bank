const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    extract: {
      type: [
        {
          action: {
            type: String,
            default: null,
          },
          amount: {
            type: String,
            default: null,
          },
          date: {
            type: String,
            default: null,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
