import { Document } from 'mongoose';

import { Agency } from './agency.types';
import { Permission } from './permission.types';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  AGENCY_OWNER = 'AGENCY_OWNER',
  AGENCY_ADMIN = 'AGENCY_ADMIN',
  SUBACCOUNT_USER = 'SUBACCOUNT_USER',
  SUBACCOUNT_GUEST = 'SUBACCOUNT_GUEST',
}

export enum Plan {
  price_1OYxkqFj9oKEERu1NbKUxXxN = 'price_1OYxkqFj9oKEERu1NbKUxXxN',
  price_1OYxkqFj9oKEERu1KfJGWxgN = 'price_1OYxkqFj9oKEERu1KfJGWxgN',
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  hash: string;
  salt: string;
  imgUrl: string;
  isVerified: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  otp: UserOTP;
  role: 'SUPER_ADMIN' | 'AGENCY_OWNER' | 'AGENCY_ADMIN' | 'SUBACCOUNT_USER' | 'SUBACCOUNT_GUEST';
  stripeCustomerId: string;
  agency: Agency | null;
  permissions: Permission[];
  // tickets: [Ticket];
}

export interface UserOTP {
  code: string;
  expires: Date | string;
}

export interface UserDocument extends User, Document {
  _id: string;
  comparePassword(password: string): Promise<boolean>;
  verifyOtpCode(code: string): Promise<boolean>;
}
