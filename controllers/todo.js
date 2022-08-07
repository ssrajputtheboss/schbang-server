import UserSchema from '../models/user.js';
import ToDoSchema, { ToDoStatus, ToDoFlags } from '../models/todo.js';
export async function addToDo(req, res) {
  try {
    const user = await UserSchema.findById(req.userId);
    const { title, description, organisation, dueDate, flag, id } = req.body;
    if (!user.organisations.includes(organisation)) {
      throw Error('You are not part of this organisation');
    }
    if (!Object.values(ToDoFlags).includes(flag)) {
      throw Error('Invalid flag type');
    }
    const todo = new ToDoSchema({
      title,
      description,
      dueDate,
      organisation,
      userId: id || user.id,
      flag
    });
    await todo.save();
    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function getToDos(req, res) {
  try {
    const user = await UserSchema.findById(req.userId);
    let todos = await ToDoSchema.find({ userId: user.id });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateToDo(req, res) {
  try {
    const { todoId, status } = req.body;
    const user = await UserSchema.findById(req.userId);
    const todo = await ToDoSchema.findById(todoId);
    if (user.userType !== 'admin' && todo && todo.userId !== user.id) {
      throw Error('you can not modify this todo');
    }
    if (!Object.values(ToDoStatus).includes(status)) {
      throw Error('Invalid status type');
    }
    if (todo.status !== status) {
      todo.status = status;
      await todo.save();
    }
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
