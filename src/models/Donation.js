import mongoose from 'mongoose';

const BLOOD_TYPES = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodType: { type: String, enum: BLOOD_TYPES, required: true },
    units: { type: Number, min: 0.5, max: 10, required: true },
    location: { type: String, required: true },
    available: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);
