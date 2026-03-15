import express from 'express';
import db from '../config/db.js';

const router = express.Router();

/**
 * 统一响应格式
 * @param {Response} res Response 对象
 * @param {Number} code 状态码
 * @param {any} data 数据
 * @param {String} message 提示信息
 */
const sendResponse = (res, code, data, message) => {
  res.status(code >= 200 && code < 300 ? 200 : code).json({ code, data, message });
};

/**
 * 获取所有艺术品列表
 */
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT `id`, `title`, `artist`, `description`, `image_url`, `create_time` FROM `artworks` ORDER BY `id` DESC');
    sendResponse(res, 200, rows, '获取艺术品列表成功');
  } catch (error) {
    console.error('获取艺术品列表错误:', error);
    next(error);
  }
});

/**
 * 获取单件艺术品详情
 */
router.get('/:id', async (req, res, next) => {
  try {
    const artworkId = req.params.id;
    const [rows] = await db.query('SELECT `id`, `title`, `artist`, `description`, `image_url`, `create_time` FROM `artworks` WHERE `id` = ?', [artworkId]);
    if (rows.length === 0) {
      return sendResponse(res, 404, null, '艺术品不存在');
    }
    sendResponse(res, 200, rows[0], '获取艺术品详情成功');
  } catch (error) {
    console.error(`获取艺术品详情错误 (ID: ${req.params.id}):`, error);
    next(error);
  }
});

/**
 * [可选] 新增艺术品
 */
router.post('/', async (req, res, next) => {
  try {
    const { title, artist, description, image_url } = req.body;
    if (!title || !artist) {
      return sendResponse(res, 400, null, '标题和艺术家不能为空');
    }
    
    // 执行插入
    const [result] = await db.query(
      'INSERT INTO `artworks` (`title`, `artist`, `description`, `image_url`) VALUES (?, ?, ?, ?)',
      [title, artist, description || null, image_url || null]
    );
    
    sendResponse(res, 201, { id: result.insertId }, '添加艺术品成功');
  } catch (error) {
    console.error('新增艺术品错误:', error);
    next(error);
  }
});

export default router;
