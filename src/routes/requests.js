import { Router } from 'express';
import Request from '../models/Request.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { bloodType, units, location, urgency } = req.body;
    const request = await Request.create({ requester: req.userId, bloodType, units, location, urgency });
    res.status(201).json({ request });
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    const { bloodType, location, fulfilled } = req.query;
    const q = {};
    if (bloodType) q.bloodType = bloodType;
    if (location) q.location = location;
    if (fulfilled !== undefined) q.fulfilled = fulfilled === 'true';
    const requests = await Request.find(q).populate('requester', 'name bloodType location');
    res.json({ requests });
  } catch (err) { next(err); }
});

router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const requests = await Request.find({ requester: req.userId });
    res.json({ requests });
  } catch (err) { next(err); }
});

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const request = await Request.findOneAndUpdate({ _id: id, requester: req.userId }, updates, { new: true });
    if (!request) return res.status(404).json({ message: 'Not found' });
    res.json({ request });
  } catch (err) { next(err); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await Request.findOneAndDelete({ _id: id, requester: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
