import type { Express } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import { UserRepository } from '../middlewares/user/user.repository';
import { UserService } from '../services/user.service';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const passportConfig = {
  JWT_SECRET: `${process.env.JWT_SECRET}`,
};

export const configure = (app: Express): void => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await userService.findOneBy({ email, password });
          return done(undefined, user);
        } catch {
          return done(undefined, false, {
            message: 'Invalid email or password',
          });
        }
      }
    )
  );

  passport.use(
    'admin/login',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await userService.findOneBy({
            email,
            password,
            isAdmin: true,
          });
          return done(undefined, user);
        } catch {
          return done(undefined, false, {
            message: 'Invalid email or password',
          });
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: passportConfig.JWT_SECRET,
      },
      async (jwtPayload, cb) => {
        try {
          const user = await userService.findOne(jwtPayload.id);
          return cb(undefined, user);
        } catch {
          return cb(undefined, false, {
            message: 'Invalid token',
          });
        }
      }
    )
  );
};
