const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const { accessKey } = req.body;

  // check if JWT Token exists
  if (accessKey) {
    jwt.verify(accessKey, process.env.SECRET_CODE, (err, decodedToken) => {
      if (err) {
       
        return res.status(200).json({ message: "error1" });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    return res.status(200).json({ message: "error2" });
  }
};

module.exports = { requireAuth };