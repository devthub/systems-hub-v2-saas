import mongoose, { Schema } from 'mongoose';

import { ContactDocument } from '@/types/contact.types';

const ContactSchema: Schema<ContactDocument> = new Schema<ContactDocument>(
  {
    name: { type: String, required: true },
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
    },
    subAccount: { type: Schema.Types.ObjectId, ref: 'SubAccount', required: true },
  },
  { timestamps: true }
);

ContactSchema.index({ subAccount: 1 });

export default mongoose.models.Contact || mongoose.model<ContactDocument>('Contact', ContactSchema);
