import mongoose, { Schema } from 'mongoose';

import { InvitationDocument } from '@/types/invitation.types';

const InvitationSchema: Schema<InvitationDocument> = new Schema<InvitationDocument>(
  {
    id: { type: String, required: true, default: mongoose.Types.ObjectId },
    email: {
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
    }, // Ensure uniqueness for email
    agency: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' }, // Define valid statuses
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'AGENCY_OWNER', 'AGENCY_ADMIN', 'SUBACCOUNT_USER', 'SUBACCOUNT_GUEST'],
      default: 'SUBACCOUNT_USER',
    }, // Define valid roles
  },
  { timestamps: true }
);

InvitationSchema.index({ agency: 1 });

export default mongoose.models.Invitation || mongoose.model<InvitationDocument>('Invitation', InvitationSchema);
