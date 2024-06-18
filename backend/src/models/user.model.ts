import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User extends Document {
  email: string;
  password: string;
  confirmPassword: string;
  dob: Date;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Please enter email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, 'Please enter your Date of Birth'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = model<User>('User', userSchema);
