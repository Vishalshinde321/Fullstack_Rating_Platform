const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Client-side mapping validator pattern match
const validatePassword = (pw) => /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(pw);

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    if (name.length < 20 || name.length > 60 || address.length > 400 || !validatePassword(password)) {
      return res.status(400).json({ message: 'Validation rule violation.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, address, role: 'Normal' });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists or error occurred.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role, name: user.name });
});

router.put('/change-password', authenticateJWT, async (req, res) => {
  const { newPassword } = req.body;
  if (!validatePassword(newPassword)) return res.status(400).json({ message: 'Invalid dynamic policy rule' });
  
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashedPassword }, { where: { id: req.user.id } });
  res.json({ message: 'Password updated successfully' });
});

module.exports = router;
