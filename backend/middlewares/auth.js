const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'secret-key-mesto' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
