import mongoose from 'mongoose';

const BLOOD_TYPES = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];

const requestSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodType: { type: String, enum: BLOOD_TYPES, required: true },
    units: { type: Number, min: 0.5, max: 10, required: true },
    location: { type: String, required: true },
    urgency: { type: String, enum: ['low','medium','high'], default: 'medium' },
    fulfilled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Request', requestSchema);
