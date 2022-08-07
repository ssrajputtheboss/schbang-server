import mongoose from 'mongoose';

export const PostTypes = {
  announcement: 'Announcement',
  event: 'Event',
  promotion: 'Promotion',
  shoutOut: 'Shout Out'
};

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  profileUrl: { type: String, required: true },
  organisation: { type: String, required: true, defaut: 'general' },
  isPinned: { type: Boolean, required: true, default: false },
  time: { type: Date, required: true },
  type: { type: String, required: true, default: '' },
  attachments: { type: Array, required: true, default: [] },
  comments: { type: Array, required: true, default: [] },
  likes: { type: Array, required: true, default: [] },
  text: { type: String, required: true }
});

export default mongoose.model('Posts', PostSchema);
