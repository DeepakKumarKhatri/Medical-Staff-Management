const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token =
      req.body.token || req.query.token || req.headers["authorization"];

    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Authorization Token not found",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid Token" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.userRole !== requiredRole) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRole,
};
