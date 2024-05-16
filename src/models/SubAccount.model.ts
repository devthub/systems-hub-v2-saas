import mongoose, { Schema } from 'mongoose';

import { SubAccountDocument } from '@/types/sub-account.types';

const SubAccountSchema: Schema<SubAccountDocument> = new Schema<SubAccountDocument>(
  {
    connectAccountId: { type: String, default: '' },
    name: { type: String, required: true },
    subAccountLogo: { type: String },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format!',
      },
    },
    companyPhone: { type: String },
    goal: { type: Number, default: 5 },
    address: { type: String },
    city: { type: String },
    zipCode: { type: String },
    state: { type: String },
    country: { type: String },
    agency: { type: Schema.Types.ObjectId, ref: 'Agency', required: true }, // Reference Agency model
    sidebarOptions: { type: [Schema.Types.ObjectId], ref: 'SubAccountSidebarOption' }, // Array of SubAccountSidebarOption references
    permissions: { type: [Schema.Types.ObjectId], ref: 'Permission' }, // Array of Permission references
    notifications: { type: [Schema.Types.ObjectId], ref: 'Notification' }, // Array of Notification references
    mediaFiles: { type: [Schema.Types.ObjectId], ref: 'MediaFile' }, // Array of Media references
    contacts: { type: [Schema.Types.ObjectId], ref: 'Contact' }, // Array of Contact references

    // funnels: { type: [Schema.Types.ObjectId], ref: 'Funnel' }, // Array of Funnel references
    // Trigger: { type: [Schema.Types.ObjectId], ref: 'Trigger' }, // Array of Trigger references
    // Automation: { type: [Schema.Types.ObjectId], ref: 'Automation' }, // Array of Automation references
    // Pipeline: { type: [Schema.Types.ObjectId], ref: 'Pipeline' }, // Array of Pipeline references
    // Tags: { type: [Schema.Types.ObjectId], ref: 'Tag' }, // Array of Tag references
  },
  { timestamps: true }
); // Enable timestamps

SubAccountSchema.index({ agency: 1 }); // Create an index on agencyId

// Create and export User model
export default mongoose.models.SubAccount || mongoose.model<SubAccountDocument>('SubAccount', SubAccountSchema);
