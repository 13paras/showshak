import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

/* router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    console.log('Google Request: ', req.user);
    const token = jwt.sign(
      { id: req.user?.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
    res.redirect(`exp://192.168.237.78:8081/--/token=${token}`); // Redirect to Expo app with token
  }
); */

export { router };
