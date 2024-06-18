import { z } from 'zod';

const signupBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  date: z.string().date(),
});

type SignupBody = z.infer<typeof signupBody>;

const signinBody = z.object({
  
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SigninBody = z.infer<typeof signinBody>;

const updateBody = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});

type UpdateBody = z.infer<typeof updateBody>;

export {
  signupBody,
  SignupBody,
  signinBody,
  SigninBody,
  updateBody,
  UpdateBody,
};
