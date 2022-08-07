import UserSchema from '../models/user.js';
import { generateToken } from './jwt.js';
import bcrypt from 'bcrypt';

export async function addUser(req, res) {
  try {
    let { email, password, id, position, profileUrl, name } = req.body;
    let user = await UserSchema.findOne({ email });
    if (user) throw Error('User already exists');
    else {
      password = bcrypt.hashSync(password, 10);
      user = new UserSchema({ email, password, id, position, profileUrl, name });
      await user.save();
      res
        .status(200)
        .json({ message: 'User added successfully', token: generateToken(user._id), user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function logInUser(req, res) {
  try {
    const { email, password } = req.body;
    let user = await UserSchema.findOne({ email });
    if (!user) throw Error('User does not exist');
    else {
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) throw Error('Invalid password');
      else {
        res
          .status(200)
          .json({ message: 'User logged in successfully', token: generateToken(user._id), user });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function getUserDetails(req, res) {
  try {
    const user = await UserSchema.findById(req.userId).select(
      'id name profileUrl userType position'
    );
    if (!user) throw Error('User does not exist');
    else res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
