import { Invitation } from '@clerk/nextjs/dist/types/server';
import { Document } from 'mongoose';

import { AgencySidebarOption } from './agency-sidebar-option.types';
import { SubAccount } from './sub-account.types';
import { User } from './user.types';

export interface AgencyDocument extends Agency, Document {
  _id: string;
}

export interface Agency {
  _id: string;
  connectAccountId?: string; // Optional connectAccountId
  customerId: string;
  name: string;
  agencyLogo: string;
  companyEmail: string;
  companyPhone?: string; // Optional companyPhone
  whiteLabel: boolean;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  goal?: number; // Optional goal with default 5
  users: User[]; // Array of User objects
  subAccounts: SubAccount[]; // Array of User objects
  sidebarOptions: AgencySidebarOption[]; // Array of User objects
  notifications?: Notification[]; // Optional array of Notification objects
  invitations?: Invitation[]; // Optional array of Invitation objects

  // subscription?: Subscription; // Optional Subscription object
  // addOns?: AddOns[]; // Optional array of AddOns objects

  createdAt: Date; // Mongoose-generated creation date
  updatedAt: Date; // Mongoose-generated update date
}
