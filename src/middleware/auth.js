import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function requireAuth(req, res, next) {
  try {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization;
    const headerToken = authHeader?.split(' ')[1];
    const token = cookieToken || headerToken;
    
    console.log('Auth Check:', { cookieToken: !!cookieToken, authHeader: !!authHeader, headerToken: !!headerToken, token: !!token });
    
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.userId = payload.sub;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export async function attachUser(req, res, next) {
  if (!req.userId) return next();
  try {
    const user = await User.findById(req.userId).select('-password');
    req.user = user;
  } catch (_) {}
  next();
}

export async function requireAdmin(req, res, next) {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(req.userId).select('role');
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
