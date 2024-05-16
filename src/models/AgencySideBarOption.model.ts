import mongoose, { Schema } from 'mongoose';

import { AgencySidebarOptionDocument } from '@/types/agency-sidebar-option.types';

const AgencySidebarOptionSchema: Schema<AgencySidebarOptionDocument> = new Schema<AgencySidebarOptionDocument>(
  {
    id: { type: String, required: true, default: mongoose.Types.ObjectId },
    name: { type: String, default: 'Menu' },
    link: { type: String, default: '#' },
    icon: { type: String, default: 'info' },
    agency: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
  },
  { timestamps: true }
);

AgencySidebarOptionSchema.index({ agency: 1 });

export default mongoose.models.AgencySidebarOption ||
  mongoose.model<AgencySidebarOptionDocument>('AgencySidebarOption', AgencySidebarOptionSchema);
