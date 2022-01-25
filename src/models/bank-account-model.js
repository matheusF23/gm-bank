const MongoDB = require('../databases/mongodb');

const BankAccountSchema = require('../schemas/bank-account-schema');

const connection = MongoDB.getOrCreateConnection();

const BankAccount = connection.model(
  'bank_accounts',
  BankAccountSchema,
  'bank_accounts'
);

module.exports = BankAccount;