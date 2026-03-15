import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import artworkRoutes from './routes/artworks.js';
import pool from './config/db.js';

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

// 路由挂载
app.use('/api/artworks', artworkRoutes);

// 健康检查接口 (增加数据库连通性自检)
app.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as status');
    res.json({ 
      code: 200, 
      data: { 
        status: 'ok', 
        database: rows[0].status === 1 ? 'connected' : 'error' 
      }, 
      message: 'success' 
    });
  } catch (err) {
    res.status(500).json({ 
      code: 500, 
      data: { status: 'error', database: 'disconnected' }, 
      message: err.message 
    });
  }
});

/**
 * 全局错误处理中间件
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

// 启动服务时进行数据库预检查
const startServer = async () => {
  console.log('--- 正在自检服务状态 ---');
  console.log(`静态资源托管路径: ${path.join(__dirname, '../frontend')}`);
  
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ 数据库连通性自检通过');
  } catch (err) {
    console.error('❌ 数据库连通性自检失败！请检查环境变量配置');
    console.error('错误详情:', err.message);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 服务运行中: http://0.0.0.0:${PORT}`);
    console.log('--- 自检完成 ---');
  });
};

startServer();
