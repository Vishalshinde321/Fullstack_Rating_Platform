const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const bcrypt = require('bcryptjs');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const { User, Store, Rating } = require('../models');

router.use(authenticateJWT, authorizeRoles('Admin'));

router.get('/dashboard', async (req, res) => {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();
  res.json({ totalUsers: users, totalStores: stores, totalRatings: ratings });
});

router.post('/users', async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, address, role });
  res.status(201).json(user);
});

router.post('/stores', async (req, res) => {
  const { name, address, ownerId } = req.body;
  const store = await Store.create({ name, address, ownerId });
  res.status(201).json(store);
});

router.get('/users-list', async (req, res) => {
  const { name, email, address, role, sortBy = 'name', order = 'ASC' } = req.query;
  const filters = {};
  if (name) filters.name = { [Op.like]: `%${name}%` };
  if (email) filters.email = { [Op.like]: `%${email}%` };
  if (address) filters.address = { [Op.like]: `%${address}%` };
  if (role) filters.role = role;

  const users = await User.findAll({
    where: filters,
    order: [[sortBy, order]],
    include: [{ model: Store, as: 'OwnedStore' }]
  });
  res.json(users);
});

module.exports = router;
