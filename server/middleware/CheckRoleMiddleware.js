const jwt = require('jsonwebtoken');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; // Bearer asdfasdf
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован (token)' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // проверяем токен на валидность

      req.user = decoded;

      if (decoded.role !== role) {
        res.status(403).json({ message: 'Нет доступа' });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Не авторизован (error)' });
    }
  };
};
