import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import artworkRoutes from './routes/artworks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 获取 __dirname 的 ESM 替代方案
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 中间件配置
app.use(cors()); // 跨域处理
app.use(express.json()); // 解析 JSON body
app.use(express.static(path.join(__dirname, '../frontend'))); // 托管前端静态文件

// API 路由挂载
app.use('/api/artworks', artworkRoutes);

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({ code: 200, data: { status: 'ok' }, message: 'success' });
});

/**
 * 全局错误处理中间件
 * 确保所有未捕获错误均以统一格式返回
 */
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    code: err.status || 500,
    data: null,
    message: err.message || 'Internal Server Error'
  });
});

// 处理 404
app.use((req, res) => {
  res.status(404).json({ code: 404, data: null, message: '接口或资源不存在' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on http://0.0.0.0:${PORT}`);
});
