import express from 'express';
import { db } from '../firebase.js';
import { getDoc, doc } from 'firebase/firestore';

const router = express.Router();

// Route to redirect to the original URL
router.post('/', async (req, res) => {
  const { shortId } = req.body;
  try {
    const urlDoc = await getDoc(doc(db, 'urls', shortId));
    if (urlDoc.exists()) {
      res.status(200).json({ originalUrl: urlDoc.data().originalUrl });
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving short URL' });
  }
});

export default router;