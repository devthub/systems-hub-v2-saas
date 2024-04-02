import { Document } from 'mongoose';

import { SubAccount } from './sub-account.types';

export interface MediaFileDocument extends MediaFile, Document {
  _id: string;
}

export interface MediaFile {
  _id: string;
  type?: string;
  name: string;
  size: string;
  metaData?: object;
  link: string; // Unique link
  subAccount: SubAccount; // Reference to SubAccount object
  createdAt: Date;
  updatedAt: Date;
}
