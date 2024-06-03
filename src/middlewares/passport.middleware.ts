import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserRepository from '../repositories/user.repository';
import configs from '../constants/config';
const userRepository = new UserRepository();

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await userRepository.findOne({ _id: payload._id }, '-password');
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  },
);

passport.use(jwtStrategy);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userRepository.findById(id, '-password');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
