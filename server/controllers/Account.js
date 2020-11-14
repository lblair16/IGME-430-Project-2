const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const appPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

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

// const changeUsername = (req, res) => {
//   // cast strings for security
//   console.log(req.session.account);
//   const newUsername = `${req.body.username}`;
//   const password = `${req.body.password}`;

//   if (!newUsername || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   return Account.AccountModel.authenticate(
//     req.session.account.username,
//     password,
//     (err, account) => {
//       console.log(err);
//       if (err || !account) {
//         return res.status(400).json({ error: "Wrong password" });
//       }
//       Account.AccountModel.findByUsername(newUsername, (err, doc) => {
//         if (err) {
//           return res.status(400).json({ error: "An error occured" });
//         }
//         console.log(doc);
//         if (!doc) {
//           console.log('here');
//           account.username = newUsername;

//           const savePromise = account.save();
//           savePromise.then(() => {
//             req.session.account = Account.AccountModel.toAPI(account);
//             return res.status(204).send();
//           });
//           savePromise.catch((err) => {
//             console.log(err);
//             return res.status(400).json({ error: "An error occured" });
//           });
//         }
//         return res.status(400).json({ error: "Username already in use" });
//       });
//     }
//   );
// };

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

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  getToken,
  appPage,
  changePassword,
  // changeUsername,
};
