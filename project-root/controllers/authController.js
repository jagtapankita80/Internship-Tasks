const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '1h'
  });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user._id);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
       return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
