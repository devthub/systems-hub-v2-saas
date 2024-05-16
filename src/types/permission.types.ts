import { Document } from 'mongoose';

import { SubAccount } from './sub-account.types';

export interface PermissionDocument extends Permission, Document {
  _id: string;
}

export interface Permission extends Document {
  _id: string;
  email: string;
  subAccount: SubAccount;
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
}
