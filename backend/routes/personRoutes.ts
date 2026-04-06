import { Router, Request, Response } from 'express';
import { Person } from '../models/Person.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const people = await Person.find().populate('assignedCats');
    res.json(people);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const person = new Person(req.body);
  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPerson);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Személy törölve' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
