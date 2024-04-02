import { Document } from 'mongoose';

import { Agency } from './agency.types';
import { Icon } from './icon.types';

export interface AgencySidebarOptionDocument extends AgencySidebarOption, Document {
  _id: string;
}

export interface AgencySidebarOption extends Document {
  _id: string;
  name: string;
  link: string;
  agency?: Agency;
  createdAt: Date;
  updatedAt: Date;
  icon: Icon;
}
