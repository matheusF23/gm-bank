const BankAccountValidation = require('../validations/bank-account-validation');
const BankAccountService = require('../services/bank-account-service');

class BankAccountHandler {
  static async getBalance(req, res) {
    try {
      const { userId } = req.params;

      if (!(await BankAccountValidation.validateInputData(userId))) {
        return res.status(400).json({ error: 'Dados inválidos!' });
      }

      const balance = await BankAccountService.getBalance(userId);

      return res.json(balance);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  static async getExtract(req, res) {
    try {
      const { userId } = req.params;

      if (!(await BankAccountValidation.validateInputData(userId))) {
        return res.status(400).json({ error: 'Dados inválidos!' });
      }

      const extract = await BankAccountService.getExtract(userId);

      return res.json(extract);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  static async deposit(req, res) {
    try {
      const { userId, amount } = req.body;

      if (
        !(await BankAccountValidation.validateTransectionData({
          userId,
          amount,
        }))
      ) {
        return res.status(400).json({ error: 'Valor inválido!' });
      }

      const extract = await BankAccountService.addMoney(userId, amount);

      return res.json(extract);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  static async withdraw(req, res) {
    try {
      const { userId, amount } = req.body;

      if (
        !(await BankAccountValidation.validateTransectionData({
          userId,
          amount,
        }))
      ) {
        return res.status(400).json({ error: 'Valor inválido!' });
      }

      const extract = await BankAccountService.withdraw(userId, amount);

      return res.json(extract);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
}

module.exports = BankAccountHandler;
