import { Router, Response } from 'express';
import { Cat } from '../models/Cat.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const cats = await Cat.find({ user: req.user?.id } as any);
    res.json(cats);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const cat = new Cat({
    ...req.body,
    user: req.user?.id
  });
  try {
    const newCat = await cat.save();
    res.status(201).json(newCat);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const cat = await Cat.findOne({ _id: req.params.id, user: req.user?.id } as any);
    if (!cat) return res.status(404).json({ message: 'A macska nem található' });
    res.json(cat);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const updatedCat = await Cat.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id } as any,
      req.body,
      { new: true }
    );
    if (!updatedCat) return res.status(404).json({ message: 'A macska nem található vagy nincs hozzáférése' });
    res.json(updatedCat);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const deletedCat = await Cat.findOneAndDelete({ _id: req.params.id, user: req.user?.id } as any);
    if (!deletedCat) return res.status(404).json({ message: 'A macska nem található vagy nincs hozzáférése' });
    res.json({ message: 'Macska törölve' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;