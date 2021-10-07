const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, "private123", (err, decode) => {
      if (err) {
        return res.status(401).send("User belum terverifikasi");
      }
      req.user = decode;
      next();
    });
  },
};
