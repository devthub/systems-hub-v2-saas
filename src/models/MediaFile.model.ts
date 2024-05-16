import mongoose, { Schema } from 'mongoose';

import { MediaFileDocument } from '@/types/media-file.types';

const MediaFileSchema: Schema<MediaFileDocument> = new Schema<MediaFileDocument>(
  {
    id: { type: String, required: true, default: mongoose.Types.ObjectId }, // Use ObjectId for Mongoose-generated ID
    type: { type: String },
    name: { type: String, required: true },
    link: { type: String, unique: true, required: true }, // Ensure uniqueness and required
    subAccount: { type: Schema.Types.ObjectId, ref: 'SubAccount', required: true }, // Reference SubAccount model
    metaData: { type: Object },
  },
  { timestamps: true }
); // Enable timestamps

MediaFileSchema.index({ subAccount: 1 });

export default mongoose.models.MediaFile || mongoose.model<MediaFileDocument>('MediaFile', MediaFileSchema);
