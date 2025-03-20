import express from 'express';
import { db } from '../firebase.js';
import { getDoc, doc } from 'firebase/firestore';

const router = express.Router();

// Route to redirect to the original URL
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const doc = await getDoc(doc(db, 'urls', shortId));
    if (doc.exists()) {
      res.redirect(doc.data().originalUrl);
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving short URL' });
  }
});

export default router;