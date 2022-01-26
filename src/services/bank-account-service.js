const Exception = require('../helpers/exception');

const User = require('../models/user-model');
const BankAccount = require('../models/bank-account-model');

class BankAccountService {
  static async getBalance(userId) {
    const user = await User.findByUserId(userId);

    if (!user) throw new Exception({ status: 400, message: 'User not found.' });

    const { balance } = await BankAccount.getAccount(userId);

    return { balance };
  }

  static async addMoney(userId, amount) {
    const user = await User.findByUserId(userId);

    if (!user) throw new Exception({ status: 400, message: 'User not found.' });

    const account = await BankAccount.getAccount(userId);
    const extract = { action: 'DEPOSIT', amount };

    account.balance += amount;
    account.extract.push(extract);

    account.save();
  }
}

module.exports = BankAccountService;
