const models = require('../models');

const { Account } = models;

// render the login/signup page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken(), title: 'Login' });
};

// render the main app
const appPage = (req, res) => {
  res.render('app', {
    csrfToken: req.csrfToken(),
    title: `Welcome, ${req.session.account.username}!`,
  });
};

// destroy current user session to log them out
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// handle user login
const login = (request, response) => {
  const req = request;
  const res = response;

  // cast strings for security
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(
    username,
    password,
    (err, account) => {
      if (err || !account) {
        return res.status(400).json({ error: 'Wrong username or password' });
      }
      req.session.account = Account.AccountModel.toAPI(account);
      return res.json({ redirect: '/app' });
    },
  );
};

// handle changing the users password
const changePassword = (req, res) => {
  // cast strings for security
  const oldPassword = `${req.body.oldPassword}`;
  const newPassword = `${req.body.newPassword}`;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(
    req.session.account.username,
    oldPassword,
    (err, account) => {
      if (err || !account) {
        return res.status(400).json({ error: 'Wrong password' });
      }
      return Account.AccountModel.generateHash(newPassword, (salt, hash) => {
        const newAccount = account;
        newAccount.password = hash;
        newAccount.salt = salt;
        const savePromise = newAccount.save();
        savePromise.then(() => {
          req.session.account = Account.AccountModel.toAPI(newAccount);
          res.status(204).send();
        });
        savePromise.catch((err2) => {
          console.log(err2);
          return res.status(400).json({ error: 'An error occured' });
        });
      });
    },
  );
};

// handle new users creating an account
const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast strings for security
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/app' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }
      return res.status(400).json({ error: 'An error occured' });
    });
  });
};

// provide the security token
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

// return the current user account
const getAccount = (req, res) => {
  res.json({ account: req.session.account });
};

// set the current user account to be unlocked
const unlockAccount = (req, res) => {
  Account.AccountModel.findByUsername(
    req.session.account.username,
    (err, doc) => {
      if (err || !doc) {
        return res.status(400).json({ error: 'An error occured' });
      }
      const updatedAccount = doc;
      updatedAccount.unlocked = true;
      const savePromise = updatedAccount.save();
      savePromise.then(() => {
        req.session.account = Account.AccountModel.toAPI(updatedAccount);
        return res.status(200).json({ account: req.session.account });
      });
      savePromise.catch((err2) => {
        console.log(err2);
        return res.status(400).json({ error: 'An error occured' });
      });
      return true;
    },
  );
};

// add the given score to the user account
const addScore = (req, res) => {
  if (req.body.score) {
    Account.AccountModel.findByUsername(
      req.session.account.username,
      (err, doc) => {
        if (err || !doc) {
          return res.status(400).json({ error: 'An error occured' });
        }
        const updatedAccount = doc;
        updatedAccount.score += Number(req.body.score);
        const savePromise = updatedAccount.save();
        savePromise.then(() => {
          req.session.account = Account.AccountModel.toAPI(updatedAccount);
          return res.status(200).json({ account: req.session.account });
        });
        savePromise.catch((err2) => {
          console.log(err2);
          return res.status(400).json({ error: 'An error occured' });
        });
        return true;
      },
    );
  } else {
    return res.status(400).json({ error: 'Must include a score' });
  }
  return true;
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  getToken,
  appPage,
  changePassword,
  getAccount,
  unlockAccount,
  addScore,
};
