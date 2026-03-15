import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * 统一返回格式工具函数
 */
const sendResponse = (res, code, data, message) => {
  res.status(code >= 200 && code < 300 ? 200 : code).json({ code, data, message });
};

/**
 * GET /api/artworks
 * 获取所有艺术品列表
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM artworks ORDER BY create_time DESC');
    sendResponse(res, 200, rows, 'success');
  } catch (error) {
    console.error('Error fetching artworks:', error);
    sendResponse(res, 500, null, error.message);
  }
});

/**
 * GET /api/artworks/:id
 * 获取指定 ID 的艺术品详情
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM artworks WHERE id = ?', [id]);
    if (rows.length === 0) {
      return sendResponse(res, 404, null, '未找到该艺术品');
    }
    sendResponse(res, 200, rows[0], 'success');
  } catch (error) {
    console.error(`Error fetching artwork ${id}:`, error);
    sendResponse(res, 500, null, error.message);
  }
});

export default router;
