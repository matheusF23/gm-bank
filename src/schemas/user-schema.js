import mongoose from 'mongoose';

export default new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
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
