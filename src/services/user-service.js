const Exception = require('../helpers/exception');

const SessionService = require('./session-service');

const User = require('../models/user-model');
const BankAccount = require('../models/bank-account-model');

class UserService {
  static async create(name, email, password) {
    const userExists = await User.findByEmail(email);

    if (userExists) {
      throw new Exception({ status: 400, message: 'User already exists.' });
    }

    const user = await User.register(name, email, password);
    await BankAccount.create({ userId: user.userId });
    const sessionData = await SessionService.create(email, password);

    return sessionData;
  }
}

module.exports = UserService;
