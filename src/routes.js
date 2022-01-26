const { Router } = require('express');

const UserHandler = require('./handlers/user-handler');
const SessionHandler = require('./handlers/session-handler');
const BankAccountHandler = require('./handlers/bank-account-handler');

const authMiddleware = require('./services/auth-service');

const routes = new Router();

routes.post('/users', UserHandler.create);
routes.post('/sessions', SessionHandler.create);

routes.use(authMiddleware);

routes.get('/balance/:userId', BankAccountHandler.getBalance);
routes.post('/deposit', BankAccountHandler.deposit);

module.exports = routes;
