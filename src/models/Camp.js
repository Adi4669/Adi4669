import mongoose from 'mongoose';

const campSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date },
    location: { type: String, required: true, trim: true },
    organizer: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Camp', campSchema);
