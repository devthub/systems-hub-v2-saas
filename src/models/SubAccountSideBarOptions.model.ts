import mongoose, { Schema } from 'mongoose';

import { SubAccountSidebarOptionDocument } from '@/types/sub-account-sidebar-options.types';

const SubAccountSidebarOptionSchema: Schema<SubAccountSidebarOptionDocument> =
  new Schema<SubAccountSidebarOptionDocument>(
    {
      name: { type: String, default: 'Menu' },
      link: { type: String, default: '#' },
      icon: { type: String, default: 'info' },
      subAccount: { type: Schema.Types.ObjectId, ref: 'SubAccount' },
    },
    { timestamps: true }
  );

SubAccountSidebarOptionSchema.index({ subAccount: 1 });

export default mongoose.models.SubAccountSidebarOption ||
  mongoose.model<SubAccountSidebarOptionDocument>('SubAccountSidebarOption', SubAccountSidebarOptionSchema);
