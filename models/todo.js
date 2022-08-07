import mongoose from 'mongoose';

export const ToDoStatus = {
  done: 'Done',
  inProgress: 'In Progress',
  inReview: 'In Review',
  created: 'Created'
};

export const ToDoFlags = {
  urgent: 'Urgent',
  important: 'Important',
  doIt: 'Do It'
};

const ToDoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  organisation: { type: String, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, required: true, default: ToDoStatus.inProgress },
  flag: { type: String, required: true, default: ToDoFlags.doIt },
  title: { type: String, required: true },
  description: { type: String, required: true, default: '' }
});

export default mongoose.model('ToDos', ToDoSchema);
