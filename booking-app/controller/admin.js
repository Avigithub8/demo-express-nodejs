const User = require('../models/database');

exports.getUser = (req, res) => {
  User.findAll()
    .then(users => {
      res.render('index', { users });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};

exports.showCreateForm = (req, res) => {
  res.render('create');
};

exports.createUser = (req, res) => {
  const { username, phoneNumber, email } = req.body;
  User.create({ username, phoneNumber, email })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};

exports.showEditForm = (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      res.render('edit', { user });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};

exports.updateUser = (req, res) => {
  const { username, phoneNumber, email } = req.body;
  User.update({ username, phoneNumber, email }, { where: { id: req.params.id } })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};

exports.deleteUser = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};


