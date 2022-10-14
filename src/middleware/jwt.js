const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, "secret");

    req.userId = decoded.userId;
    req.username = decoded.username;
    req.roleId = decoded.roleId;
    
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Authentication Timeout, Please Log in again...',
    });
  }
};