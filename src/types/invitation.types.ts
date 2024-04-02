import { Document } from 'mongoose';

import { Agency } from './agency.types';

export interface InvitationDocument extends Invitation, Document {
  _id: string;
}

export interface Invitation {
  _id: string;
  email: string;
  agency: Agency;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'; // Use enum type for status
  role: 'SUPER_ADMIN' | 'AGENCY_OWNER' | 'AGENCY_ADMIN' | 'SUBACCOUNT_USER' | 'SUBACCOUNT_GUEST'; // Use enum type for role
  createdAt: Date;
  updatedAt: Date;
}
