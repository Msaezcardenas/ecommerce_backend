import passport from 'passport';
import jwt, { ExtractJwt } from 'passport-jwt';
import { getJWTCookie } from '../utils.js';

const JWTStrategy = jwt.Strategy;

const initializePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([getJWTCookie]),
        secretOrKey: process.env.SECRET,
      },
      (jwt_payload, done) => {
        try {
          console.log('PASSPORT---->', jwt_payload);
          done(null, jwt_payload);
        } catch (e) {
          return done(e);
        }
      },
    ),
  );
};

export default initializePassport;
