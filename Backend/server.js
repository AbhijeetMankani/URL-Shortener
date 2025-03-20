import express from 'express';
import cors from 'cors';
import shortenRouter from './routes/shorten.js';
import redirectRouter from './routes/redirect.js';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/shorten', shortenRouter);
app.use('/:shortId', redirectRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 