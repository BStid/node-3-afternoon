const users = require("../models/users");
let id = 1;
let login = (req, res, next) => {
  const { session } = req;
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (user) {
    session.user.username = user.username;
    res.status(200).send(session.user);
  } else {
    res.status(500).send("Unauthorized.");
  }
};

let register = (req, res, next) => {
  const { session } = req;
  const { username, password } = req.body;

  users.push({ id, username, password });
  id++;

  session.user.username = username;

  res.status(200).send(session.user);
};

let signout = (req, res, next) => {
  const { session } = req;
  session.destroy();
  res.status(200).send(session);
};

let getUser = (req, res, next) => {
  res.status(200).json(req.session);
};

module.exports = {
  login,
  signout,
  getUser,
  register
};
