import { Router } from 'express';
import Donation from '../models/Donation.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { bloodType, units, location, available } = req.body;
    const donation = await Donation.create({ donor: req.userId, bloodType, units, location, available });
    res.status(201).json({ donation });
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    const { bloodType, location, available } = req.query;
    const q = {};
    if (bloodType) q.bloodType = bloodType;
    if (location) q.location = location;
    if (available !== undefined) q.available = available === 'true';
    const donations = await Donation.find(q).populate('donor', 'name bloodType location');
    res.json({ donations });
  } catch (err) { next(err); }
});

router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.userId });
    res.json({ donations });
  } catch (err) { next(err); }
});

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const donation = await Donation.findOneAndUpdate({ _id: id, donor: req.userId }, updates, { new: true });
    if (!donation) return res.status(404).json({ message: 'Not found' });
    res.json({ donation });
  } catch (err) { next(err); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await Donation.findOneAndDelete({ _id: id, donor: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
