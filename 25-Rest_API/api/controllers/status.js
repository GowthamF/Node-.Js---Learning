const User = require("../models/user");

exports.getStatus = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      res.json({ status: user.status });
    })
    .catch((err) => {});
};

exports.updateStatus = (req, res, next) => {
  const newStatus = req.body.status;
  User.findByIdAndUpdate(req.userId, { status: newStatus })
    .then((user) => {
      console.log(user);
      res.json({ status: user.status });
    })
    .catch((err) => {});
};
