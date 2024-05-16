import { Document } from 'mongoose';

import { Agency } from './agency.types';
import { Contact } from './contact.types';
import { MediaFile } from './media-file.types';
import { Notification } from './notification.types';
import { Permission } from './permission.types';
import { SubAccountSidebarOption } from './sub-account-sidebar-options.types';

export interface SubAccountDocument extends SubAccount, Document {
  _id: string;
}

export interface SubAccount {
  _id: string;
  connectAccountId?: string;
  name: string;
  subAccountLogo?: string;
  createdAt: Date;
  updatedAt: Date;
  companyEmail?: string;
  companyPhone?: string;
  goal?: number;
  address?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  country?: string;
  agency: Agency; // Referenced Agency ID
  mediaFiles?: MediaFile[]; // Array of Media objects
  sidebarOptions?: SubAccountSidebarOption[]; // Array of SubAccountSidebarOption objects
  notifications?: Notification[]; // Array of Notification objects
  permissions?: Permission[]; // Array of Permission objects
  contacts?: Contact[]; // Array of Contact objects

  // Funnels?: Funnel[]; // Array of Funnel objects
  // Trigger?: Trigger[]; // Array of Trigger objects
  // Automation?: Automation[]; // Array of Automation objects
  // Pipeline?: Pipeline[]; // Array of Pipeline objects
  // Tags?: Tag[]; // Array of Tag objects
}
