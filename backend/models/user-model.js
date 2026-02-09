import mongoose from 'mongoose';
const { Schema } = mongoose;

export const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String },
  otpExpires: { type: Date }
});

export const User = mongoose.model('User', userSchema);



