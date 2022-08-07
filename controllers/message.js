import MessageSchema from '../models/message.js';
import UserSchema from '../models/user.js';
export async function getMessages(req, res) {
  try {
    const user = await UserSchema.findById(req.userId);
    const messages = await MessageSchema.find({ from: user.id });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function sendMessage(req, res) {
  try {
    const user = await UserSchema.findById(req.userId);
    const { to, message } = req.body;
    const user2 = await UserSchema.findOne({ id: to });
    if (!user || !user2 || user.id === user2.id) {
      throw Error('User not found or sending message to self');
    }
    const msg = new MessageSchema({
      to,
      from: user.id,
      message,
      time: new Date()
    });
    await msg.save();
    res.status(200).json({ message: 'Message sent', message: msg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
