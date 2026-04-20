import { Router, Response } from 'express';
import { Person } from '../models/Person.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const people = await Person.find({ user: req.user?.id } as any).populate('assignedCats');
    res.json(people);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const person = new Person({
    ...req.body,
    user: req.user?.id
  });
  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id } as any,
      req.body,
      { new: true }
    );
    if (!updatedPerson) return res.status(404).json({ message: 'A személy nem található vagy nincs hozzáférése' });
    res.json(updatedPerson);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const deletedPerson = await Person.findOneAndDelete({ _id: req.params.id, user: req.user?.id } as any);
    if (!deletedPerson) return res.status(404).json({ message: 'A személy nem található vagy nincs hozzáférése' });
    res.json({ message: 'Személy törölve' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
