const passport = require('passport');

// Authenticate using Passport JWT strategy
const authenticate = passport.authenticate('jwt', { session: false });

// Check that the user has at least one of the required roles
const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const userRoles = user.roles || [];
  const hasRole = userRoles.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: insufficient role',
    });
  }

  return next();
};

module.exports = {
  authenticate,
  authorizeRoles,
};


