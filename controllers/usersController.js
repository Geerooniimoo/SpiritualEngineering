const db = require('../models');

module.exports = {
  findAll(req, res) {
    db.Users
      .find(req.query)
      .then(dbUsers => res.json(dbUsers))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  findById(req, res) {
    db.Users
      .findById(req.params.id)
      .then(dbUsers => res.json(dbUsers))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  saveUser(req, res) {
    db.Users
      .find(req.body)
      .then(res => {
        res
          ? db.Users
            .update(req.body, { $push: { 'users': Date.now() } })
            .then(dbUsers => res.json(dbUsers))
          : db.Users
            .create(req.body)
            .then(dbUsers => res.json(dbUsers))
            .catch((err) => {
              console.log(err);
              res.json(err);
            });
      });
  },
  deleteUser(req, res) {
    db.Users
      .findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
};
