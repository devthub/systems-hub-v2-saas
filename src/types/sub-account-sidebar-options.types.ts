import { Document } from 'mongoose';

import { Icon } from './icon.types';
import { SubAccount } from './sub-account.types';

export interface SubAccountSidebarOptionDocument extends SubAccountSidebarOption, Document {
  _id: string;
}

export interface SubAccountSidebarOption extends Document {
  _id: string;
  name: string;
  link: string;
  subAccount?: SubAccount;
  createdAt: Date;
  updatedAt: Date;

  icon: Icon;
}
