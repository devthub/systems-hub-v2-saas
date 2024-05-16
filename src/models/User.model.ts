import bcrypt from 'bcrypt';
import mongoose, { CallbackError, Document, Schema } from 'mongoose';

import { User } from '@/types/user.types';

// Define interface for User document
export interface UserDocument extends User, Document {
  _id: string;
  comparePassword(password: string): Promise<boolean>;
  verifyOtpCode(code: string): Promise<boolean>;
}

// Define schema for User
const UserSchema: Schema<UserDocument> = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format!',
      },
    },
    password: { type: String, select: false },
    hash: { type: String, select: false },
    salt: { type: String, select: false },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'AGENCY_OWNER', 'AGENCY_ADMIN', 'SUBACCOUNT_USER', 'SUBACCOUNT_GUEST'],
      default: 'SUBACCOUNT_USER',
    },
    stripeCustomerId: String,
    agency: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Agency' },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Permission' }],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  const saltFactor = process.env.SALT_WORK_FACTOR;

  try {
    if (!saltFactor) throw new Error('Please provide salt factor');

    const newSalt = await bcrypt.genSalt(parseInt(saltFactor));
    const newHash = await bcrypt.hash(this.password, newSalt);

    this.salt = newSalt;
    this.password = newHash;
    this.hash = newHash;

    return next();
  } catch (err) {
    console.error(err);
    return next(err as CallbackError);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.verifyOtp = function verifyOtpCode(code: string) {
  const codeExpired = Date.now() >= this.otp?.expires * 1000;
  return this.otp?.code === code && !codeExpired;
};

// Create and export User model
export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
