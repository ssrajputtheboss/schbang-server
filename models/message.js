import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  time: { type: Date, required: true },
  markAsRead: { type: Boolean, required: true, default: false }
});

export default mongoose.model('Messages', MessageSchema);
