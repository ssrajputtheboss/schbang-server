import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileUrl: { type: String, required: true },
  password: { type: String, required: true },
  position: { type: String, required: true },
  userType: { type: String, required: true, default: 'user' },
  posts: { type: Array, required: true, default: [] },
  tasks: { type: Array, required: true, default: [] },
  id: { type: String, required: true, unique: true },
  organisations: { type: Array, required: true, default: ['general'] }
});

export default mongoose.model('Users', UserSchema);
