import type { Express } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';
import { UserRepository } from '../middlewares/user/user.repository';
import { UserService } from '../services/user.service';
import { googleConfig } from './google';
import { facebookConfig } from './facebook';

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
    'employe/login',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await userService.findOneBy({
            email,
            password,
            isEmploye: true,
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
    'google',
    new GoogleStrategy(
      {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          // D'abord, essayons de trouver l'utilisateur par googleId
          let user = await userService
            .findOneBy({ googleId: profile.id })
            .catch(() => null);

          if (!user) {
            // Si pas trouvé par googleId, essayons par email
            const email = profile.emails?.[0]?.value;
            if (email) {
              user = await userService.findOneBy({ email }).catch(() => null);
            }
          }

          if (!user) {
            // Si l'utilisateur n'existe pas, créons-le
            const userData = {
              googleId: profile.id,
              email: profile.emails?.[0]?.value || '',
              firstName: profile.name?.givenName || '',
              lastName: profile.name?.familyName || '',
              picture: profile.photos?.[0]?.value || '',
              gender: 'UNKNOWN',
              birthDate: new Date(),
              isAdmin: false,
              isEmploye: false,
            };

            await userService.create(userData);
            user = await userService.findOneBy({ googleId: profile.id });
          } else if (!user.googleId) {
            // Si l'utilisateur existe mais n'a pas de googleId, mettons à jour son profil
            await userService.update(user.id, {
              googleId: profile.id,
              picture: profile.photos?.[0]?.value || '',
            });
            user = await userService.findOneBy({ id: user.id });
          }

          return done(null, user);
        } catch (error) {
          console.error('Google auth error:', error);
          return done(error as Error);
        }
      }
    )
  );

  passport.use(
    'facebook',
    new FacebookStrategy(
      {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileFields: facebookConfig.profileFields,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: FacebookProfile,
        done: VerifyCallback
      ) => {
        try {
          // D'abord, essayons de trouver l'utilisateur par facebookId
          let user = await userService
            .findOneBy({ facebookId: profile.id })
            .catch(() => null);

          if (!user) {
            // Si pas trouvé par facebookId, essayons par email
            const email = profile.emails?.[0]?.value;
            if (email) {
              user = await userService.findOneBy({ email }).catch(() => null);
            }
          }

          if (!user) {
            // Si l'utilisateur n'existe pas, créons-le
            const userData = {
              facebookId: profile.id,
              email: profile.emails?.[0]?.value || '',
              firstName: profile.name?.givenName || '',
              lastName: profile.name?.familyName || '',
              picture: profile.photos?.[0]?.value || '',
              gender: 'UNKNOWN',
              birthDate: new Date(),
              isAdmin: false,
              isEmploye: false,
            };

            await userService.create(userData);
            user = await userService.findOneBy({ facebookId: profile.id });
          } else if (!user.facebookId) {
            // Si l'utilisateur existe mais n'a pas de facebookId, mettons à jour son profil
            await userService.update(user.id, {
              facebookId: profile.id,
              picture: profile.photos?.[0]?.value || '',
            });
            user = await userService.findOneBy({ id: user.id });
          }

          return done(null, user);
        } catch (error) {
          console.error('Facebook auth error:', error);
          return done(error as Error);
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
