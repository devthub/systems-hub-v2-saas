import mongoose, { Schema } from 'mongoose';

import { NotificationDocument } from '@/types/notification.types';

const NotificationSchema: Schema<NotificationDocument> = new Schema<NotificationDocument>(
  {
    notification: { type: String, required: true },
    agency: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
    subAccount: { type: Schema.Types.ObjectId, ref: 'SubAccount' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

NotificationSchema.index({ agency: 1 });
NotificationSchema.index({ subAccount: 1 });
NotificationSchema.index({ user: 1 });

export default mongoose.models.Notification || mongoose.model<NotificationDocument>('Notification', NotificationSchema);
