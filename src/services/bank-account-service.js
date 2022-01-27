const moment = require('moment-timezone');
const Exception = require('../helpers/exception');

const User = require('../models/user-model');
const BankAccount = require('../models/bank-account-model');

moment.updateLocale('pt-BR');

class BankAccountService {
  static async getBalance(userId) {
    const user = await User.findByUserId(userId);

    if (!user) {
      throw new Exception({ status: 400, message: 'Usuário não encontrado!' });
    }

    const { balance } = await BankAccount.getAccount(userId);
    return { balance };
  }

  static async getExtract(userId) {
    const user = await User.findByUserId(userId);

    if (!user) {
      throw new Exception({ status: 400, message: 'Usuário não encontrado!' });
    }

    const { extract } = await BankAccount.getAccount(userId);
    return { extract };
  }

  static setExtract(action, amount) {
    return {
      action,
      amount,
      date: moment.tz('America/Sao_paulo').format('DD/MM/YYYY HH:mm'),
    };
  }

  static async addMoney(userId, amount) {
    const user = await User.findByUserId(userId);

    if (!user) {
      throw new Exception({ status: 400, message: 'Usuário não encontrado!' });
    }

    const account = await BankAccount.getAccount(userId);
    const extract = BankAccountService.setExtract('DEPÓSITO', amount);

    account.balance += amount;
    account.extract.push(extract);
    account.save();

    return extract;
  }

  static async withdraw(userId, amount) {
    const user = await User.findByUserId(userId);

    if (!user) {
      throw new Exception({ status: 400, message: 'Usuário não encontrado!' });
    }

    const account = await BankAccount.getAccount(userId);
    const extract = BankAccountService.setExtract('RETIRADA', amount);

    account.balance -= amount;

    if (account.balance < 0) {
      throw new Exception({ status: 400, message: 'Saldo Insuficiente!' });
    }

    account.extract.push(extract);
    account.save();

    return extract;
  }
}

module.exports = BankAccountService;
