import { Router } from 'express';
import Camp from '../models/Camp.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: list all upcoming camps (optionally filter by date >= today)
router.get('/', async (req, res, next) => {
  try {
    const { from } = req.query; // ISO date to filter from
    const q = {};
    if (from) {
      q.date = { $gte: new Date(from) };
    }
    const camps = await Camp.find(q).sort({ date: 1, createdAt: -1 });
    res.json({ camps });
  } catch (err) { next(err); }
});

// Admin: create new camp
router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { title, date, location, organizer } = req.body;
    if (!title || !location) return res.status(400).json({ message: 'Missing fields' });
    const camp = await Camp.create({ title, date: date ? new Date(date) : undefined, location, organizer, createdBy: req.userId });
    res.status(201).json({ camp });
  } catch (err) { next(err); }
});

// Admin: update camp
router.patch('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.date) updates.date = new Date(updates.date);
    const camp = await Camp.findByIdAndUpdate(id, updates, { new: true });
    if (!camp) return res.status(404).json({ message: 'Not found' });
    res.json({ camp });
  } catch (err) { next(err); }
});

// Admin: delete camp
router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Camp.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
