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

  static async getExtract(userId) {
    const user = await User.findByUserId(userId);

    if (!user) throw new Exception({ status: 400, message: 'User not found.' });

    const { extract } = await BankAccount.getAccount(userId);

    return { extract };
  }

  static async addMoney(userId, amount) {
    const user = await User.findByUserId(userId);

    if (!user) throw new Exception({ status: 400, message: 'User not found.' });

    const date = new Date();

    const account = await BankAccount.getAccount(userId);
    const extract = {
      action: 'DEPOSIT',
      amount,
      date: date.toLocaleString('pt-br'),
    };

    account.balance += amount;
    account.extract.push(extract);

    account.save();

    return extract;
  }

  static async withdraw(userId, amount) {
    const user = await User.findByUserId(userId);

    if (!user) throw new Exception({ status: 400, message: 'User not found.' });

    const date = new Date();

    const account = await BankAccount.getAccount(userId);
    const extract = {
      action: 'WITHDRAWN',
      amount,
      date: date.toLocaleString('pt-br'),
    };

    account.balance -= amount;

    if (account.balance < 0) {
      throw new Exception({ status: 400, message: 'Insufficient balance.' });
    }

    account.extract.push(extract);

    account.save();

    return extract;
  }
}

module.exports = BankAccountService;
