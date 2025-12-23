const express = require('express');
const path = require('path');
const createError = require('http-errors');
const passport = require('passport');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

// Route imports
const authRoutes = require('./routes/auth');
const secureRoutes = require('./routes/secure');
const webRoutes = require('./routes/web');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files (optional, point to /public)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport (strategies are configured in ./config/passport)
require('./config/passport');
app.use(passport.initialize());

// Routes - UI pages
app.use('/', webRoutes);

// Routes - APIs
app.use('/api/auth', authRoutes);
app.use('/api', secureRoutes);

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server after DB connection
const PORT = process.env.PORT || 3000;
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

module.exports = app;

