import jwt from 'jsonwebtoken';
import { SECRET } from '../constants/index.js';

export function generateToken(userId) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '30d' });
}
export function verifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload && payload.userId;
  } catch (error) {
    return null;
  }
}
