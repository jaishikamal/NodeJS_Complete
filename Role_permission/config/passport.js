const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User, Role } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id, {
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
      });

      if (!user) {
        return done(null, false);
      }

      // Attach a simpler roles array on the user instance
      const roles = user.Roles ? user.Roles.map((r) => r.name) : [];
      const plainUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
      };

      return done(null, plainUser);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;


