import { Router, Request, Response } from 'express';
import { Cat } from '../models/Cat.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req: Request, res: Response) => {
  const cat = new Cat(req.body);
  try {
    const newCat = await cat.save();
    res.status(201).json(newCat);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'A macska nem található' });
    res.json(cat);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const updatedCat = await Cat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCat);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    await Cat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Macska törölve' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;