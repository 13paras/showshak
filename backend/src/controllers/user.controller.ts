import createHttpError from 'http-errors';
import { User } from '../models/user.model';
import { asyncHandler } from '../utils/asyncHandler';
import { generateToken } from '../utils/generateToken';
import { CustomRequest } from '../middlewares/auth.middleware';

const getUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = createHttpError(401, 'Invalid Id');
      return next(error);
    }

    const user = await User.findById(id);

    if (!user) {
      const error = createHttpError(401, 'User not found');
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

// 'api/v1/user/register' => POST
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    if (!body) {
      const error = createHttpError(400, 'Invalid user data');
      return next(error);
    }

    const existedUser = await User.findOne({ email: body.email });

    if (existedUser) {
      const error = createHttpError(400, 'User already existed');
      return next(error);
    }

    const user = await User.create(body);

    if (user) {
      const token = generateToken(res, user._id);

      res.status(200).json({
        message: 'User Created Successfully',
        id: user._id,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.log(error);
  }
});

// 'api/v1/user/login' => POST
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    if (!body) {
      const error = createHttpError(400, 'Invalid user data');
      return next(error);
    }

    const user = await User.findOne({ email: body.email });

    if (user && (await user.matchPassword(body.password))) {
      const jwtToken = generateToken(res, user._id);

      // console.log(jwtToken);

      return res.status(200).json({
        message: 'User Logged In Successfully',
        id: user._id,
        token: jwtToken,
      });
    } else {
      const error = createHttpError(400, 'Invalid email or password');
      return next(error);
    }
  } catch (error) {
    console.log(error);
  }
});

// 'api/v1/user/profile' => PUT
//  ! Update this for password
//  Here in this we're getting "req.user" from auth middleware (verifyToken).
/* const updateUser = asyncHandler(async (req: CustomRequest, res, next) => {
  try {
    const body = req.body;
    const validatedResult = updateBody.safeParse(body);

    if (!validatedResult.success) {
      const error = createHttpError(401, validatedResult.error);
      return next(error);
    }

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      {
        $set: {
          name: body.name,
        },
      },
      { new: true }
    ); 

    res.status(200).json({
      message: 'User updated successfully',
      data: {
        // _id: user?.id,
      },
    });

    // Check if updateUser exists before sending response
  } catch (error) {
    console.log(error);
  }
}); */

// 'api/v1/user/profile' => GET
const getUserProfile = asyncHandler(async (req: CustomRequest, res) => {
  const user = await User.findById(req.user?.id);

  res.status(200).json({
    message: 'User fetched successfully',
    data: {
      _id: user?.id,
      email: user?.email,
    },
  });
});

const logoutUser = asyncHandler(async (_, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
  });
  res.status(200).json({
    message: 'User logged out',
  });
});

const updateUser = '';

export {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getUserProfile,
  getUser,
};
