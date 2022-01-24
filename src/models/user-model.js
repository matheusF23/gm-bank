const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const MongoDB = require('../databases/mongodb');

const UserSchema = require('../schemas/user-schema');

const connection = MongoDB.getOrCreateConnection();

const User = connection.model('users', UserSchema, 'users');

User.findByEmail = (email) => User.findOne({ email }).lean();

User.register = async (name, email, password) => {
  const userId = uuidv4();
  const password_hash = await bcrypt.hash(password, 8);

  return User.create({ userId, name, email, password_hash });
};

module.exports = User;
