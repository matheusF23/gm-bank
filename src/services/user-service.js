const bcrypt = require('bcryptjs');
const Exception = require('../helpers/exception');

const User = require('../models/user-model');
const BankAccount = require('../models/bank-account-model');

class UserService {
  static async checkPassword(password, user) {
    return bcrypt.compare(password, user.password_hash);
  }

  static async create(name, email, password) {
    const userExists = await User.findByEmail(email);

    if (userExists) {
      throw new Exception({ status: 400, message: 'User already exists.' });
    }

    const user = await User.register(name, email, password);
    await BankAccount.create({ userId: user.userId });

    return { userId: user.userId, name: user.name, email: user.email };
  }
}

module.exports = UserService;
