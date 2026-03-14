const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ error: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
