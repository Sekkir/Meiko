// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clavesecreta'; // Usa la misma clave secreta que en tu archivo principal

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token no válido' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
