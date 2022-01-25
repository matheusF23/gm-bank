const Exception = require('../helpers/exception');

const User = require('../models/user-model');
const BankAccount = require('../models/bank-account-model');

class BankAccountService {
  static async getBalance(userId) {
    const user = await User.findByUserId(userId);

    if (!user) throw new Exception({ status: 400, message: 'User not found.' });

    const { balance } = await BankAccount.getBalance(userId);

    return { balance };
  }
}

module.exports = BankAccountService;
