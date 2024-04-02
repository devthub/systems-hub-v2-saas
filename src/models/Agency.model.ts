import mongoose, { Schema } from 'mongoose';

import { AgencyDocument } from '@/types/agency.types';

export const AgencySchema: Schema<AgencyDocument> = new Schema<AgencyDocument>(
  {
    connectAccountId: { type: String, default: '' }, //connected stripe account
    customerId: { type: String, default: '' },
    name: { type: String, required: true },
    agencyLogo: String,
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
    companyPhone: String,
    whiteLabel: { type: Boolean, default: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    goal: { type: Number, default: 5 },

    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subAccounts: [{ type: Schema.Types.ObjectId, ref: 'SubAccount' }],
    sidebarOptions: [{ type: Schema.Types.ObjectId, ref: 'AgencySidebarOption' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  },
  { timestamps: true }
);

// Create and export User model
export default mongoose.models.Agency || mongoose.model<AgencyDocument>('Agency', AgencySchema);
