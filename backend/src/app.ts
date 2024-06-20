import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config';
import session from 'express-session';
import { User } from './models/user.model';
import { generateToken } from './utils/generateToken';

const app = express();

const clientid = config.OAUTH_CLIENT_ID;
const clientsecret = config.OAUTH_CLIENT_SECRET;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// setup session
app.use(
  session({
    secret: config.JWT_SECRET_KEY as string,
    resave: false,
    saveUninitialized: true,
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

/* passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            id: profile.id,
            email: profile.emails[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}); */

// --------************-----------
// passport-auth20 from chatgpt
passport.use(
  new GoogleStrategy(
    {
      clientID: clientid as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            _id: profile.id,
            email: profile.emails?.[0].value,
            name: profile.displayName,
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('from app.ts: ', user);
  done(null);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Router
import { router as userRouter } from './routes/user.routes';
import { router as googleRouter } from './routes/google.routes';
import { globalErrorHandler } from './middlewares/errorHandler.middleware';

app.use('/api/v1/user', userRouter);
app.use('/api/v1/google', googleRouter);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/* app.get('/auth/google/callback', passport.authenticate('google', {
  session: false
}),(req, res) => {
  const token = generateToken(req.user.id);
  res.redirect(`http://localhost:3000?token=${token}`)) */

// Error Handlers
app.use(globalErrorHandler);

export { app };
