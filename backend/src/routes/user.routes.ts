import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import {
  getUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserPassword,
  // updateUser,
} from '../controllers/user.controller';

const router = express.Router();

// POST - create user
// POST - get user
// PUT - update user
// GET - get user
// POST - logout user

router.get('/:id', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .put(verifyToken, updateUserPassword)
  .get(verifyToken, getUserProfile);

export { router };
