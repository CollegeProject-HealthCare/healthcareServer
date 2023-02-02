import { model, Schema } from 'mongoose';

const OtpSchema = new Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  OTPValue: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default model('otp', OtpSchema)