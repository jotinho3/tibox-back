require('dotenv').config();

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== process.env.AUTH_TOKEN) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next();
};