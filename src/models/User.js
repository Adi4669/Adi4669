import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    bloodType: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
    phone: { type: String },
    location: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
