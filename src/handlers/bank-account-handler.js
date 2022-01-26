const BankAccountValidation = require('../validations/bank-account-validation');
const BankAccountService = require('../services/bank-account-service');

class BankAccountHandler {
  static async getBalance(req, res) {
    const { userId } = req.params;

    if (!(await BankAccountValidation.validateGetBalanceData(userId))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const balance = await BankAccountService.getBalance(userId);

    return res.json(balance);
  }

  static async deposit(req, res) {
    const { userId, amount } = req.body;

    if (
      !(await BankAccountValidation.validateTransectionData({ userId, amount }))
    ) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    await BankAccountService.addMoney(userId, amount);

    return res.json({ message: 'Added money' });
  }

  static async withdraw(req, res) {
    const { userId, amount } = req.body;

    if (
      !(await BankAccountValidation.validateTransectionData({ userId, amount }))
    ) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    await BankAccountService.withdraw(userId, amount);

    return res.json({ message: 'Successful withdrawal' });
  }
}

module.exports = BankAccountHandler;
