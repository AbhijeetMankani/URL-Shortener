import express from 'express';
import { nanoid } from 'nanoid';
import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const router = express.Router();

// Route to create a short URL
router.post('/', async (req, res) => {
  const { originalUrl } = req.body;
  const SHORT_ID_LENGTH = 6;
  const shortId = nanoid(SHORT_ID_LENGTH);
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

  const body = {
    originalUrl,
    shortUrl
  }

  console.log(body);

  try {
    await addDoc(collection(db, 'urls'), body);
    res.status(201).json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error creating short URL' });
  }
});

export default router;