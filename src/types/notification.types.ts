import { Document } from 'mongoose';

import { Agency } from './agency.types';
import { SubAccount } from './sub-account.types';
import { User } from './user.types';

export interface NotificationDocument extends Notification, Document {
  _id: string;
}

export interface Notification {
  _id: string;
  notification: string;
  user: User;
  agency: Agency;
  subAccount?: SubAccount;
  createdAt: Date;
  updatedAt: Date;
}
