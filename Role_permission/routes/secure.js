const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Simple authenticated route
// GET /api/profile
router.get('/profile', authenticate, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

// Example of route protected by role
// GET /api/admin/dashboard
router.get(
  '/admin/dashboard',
  authenticate,
  authorizeRoles('admin'),
  (req, res) => {
    return res.json({
      success: true,
      message: 'Welcome to admin dashboard',
    });
  }
);

module.exports = router;


