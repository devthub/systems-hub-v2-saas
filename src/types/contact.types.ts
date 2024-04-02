import { Document } from 'mongoose';

import { SubAccount } from './sub-account.types';

export interface ContactDocument extends Contact, Document {
  _id: string;
}

export interface Contact extends Document {
  _id: string;
  name: string;
  email: string;
  subAccount: SubAccount; // Reference to the complete SubAccount object
  // tickets?: Ticket[]; // Array of Ticket objects (assuming interface exists)
  createdAt: Date;
  updatedAt: Date;
}
