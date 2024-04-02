import mongoose, { Schema } from 'mongoose';

import { PermissionDocument } from '@/types/permission.types';

const PermissionSchema: Schema<PermissionDocument> = new Schema<PermissionDocument>(
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
    },
    subAccount: { type: Schema.Types.ObjectId, ref: 'SubAccount', required: true },
    access: { type: Boolean, required: true },
  },
  { timestamps: true }
);

PermissionSchema.index({ subAccount: 1 });
PermissionSchema.index({ email: 1 });

export default mongoose.models.Permission || mongoose.model<PermissionDocument>('Permission', PermissionSchema);
