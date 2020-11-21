const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/app', mid.requiresLogin, mid.requiresSecure, controllers.Account.appPage);
  app.get('/getAccount', mid.requiresLogin, mid.requiresSecure, controllers.Account.getAccount);
  app.get('/unlockAccount', mid.requiresLogin, mid.requiresSecure, controllers.Account.unlockAccount);
  app.post('/changePassword', mid.requiresLogin, mid.requiresSecure, controllers.Account.changePassword);
  app.post('/addScore', mid.requiresLogin, mid.requiresSecure, controllers.Account.addScore);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
