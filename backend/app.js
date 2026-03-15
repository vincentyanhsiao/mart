import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import artworkRoutes from './routes/artworks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

app.use('/api/artworks', artworkRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
