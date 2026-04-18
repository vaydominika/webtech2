import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.patch('/profile', authenticate, async (req: any, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Felhasználó nem található.' });
    }

    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: user._id } });
      if (existingUser) {
        return res.status(400).json({ message: 'A felhasználónév már foglalt.' });
      }
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      message: 'Profil sikeresen frissítve.',
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba a profil frissítése során.' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'A felhasználónév már foglalt.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role: role || 'user'
    });

    await user.save();
    res.status(201).json({ message: 'Felhasználó sikeresen létrehozva.' });
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba a regisztráció során.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Helytelen felhasználónév vagy jelszó.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Helytelen felhasználónév vagy jelszó.' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba a bejelentkezés során.' });
  }
});

export default router;
