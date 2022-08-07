import { verifyToken } from '../controllers/jwt.js';
// for now authenticating only for keywordSuggestion endpoint
export function authMiddleware(req, res, next) {
  if (!['/login', '/signup'].includes(req.path)) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    const userId = verifyToken(token || '');
    if (token && userId) {
      req.userId = userId;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } else {
    next();
  }
}
