const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, roles = [] } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Attach roles if provided (array of role names)
    if (Array.isArray(roles) && roles.length > 0) {
      const foundRoles = await Role.findAll({ where: { name: roles } });
      await user.setRoles(foundRoles);
    }

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to register user',
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, through: { attributes: [] } }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const roles = user.Roles ? user.Roles.map((r) => r.name) : [];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roles,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to login',
    });
  }
});

module.exports = router;


