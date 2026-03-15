import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM artworks');
    res.json({ code: 200, data: rows, message: 'success' });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM artworks WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ code: 404, message: '未找到该艺术品' });
    }
    res.json({ code: 200, data: rows[0], message: 'success' });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

export default router;
