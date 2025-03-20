import express from 'express';
import { nanoid } from 'nanoid';
import { db } from '../firebase.js';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

const router = express.Router();

// Route to create a short URL
router.post('/', async (req, res) => {
  let { originalUrl } = req.body;
  
  // Ensure URL has protocol
  if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
    originalUrl = 'http://' + originalUrl;
  }

  const SHORT_ID_LENGTH = 6;
  const shortId = nanoid(SHORT_ID_LENGTH);
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

  // const body = {
  //   originalUrl,
  //   shortId
  // }

  try {
    // await addDoc(collection(db, 'urls'), body);
    // await setDoc(doc(db, 'urls', shortId), body);
    await setDoc(doc(db, 'urls', shortId), {
      originalUrl,
      shortId
    });
    res.status(201).json({ shortId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating short URL' });
  }
});

export default router;