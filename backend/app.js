import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import artworksRouter from './routes/artworks.js';

// 初始化环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors()); // 跨域处理
app.use(express.json()); // 解析 JSON body

// 路由挂载
app.use('/api/artworks', artworksRouter);

// 静态文件托管 (将以生产模式运行的前端挂载)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// 健康检查路由 (Zeabur 等云平台可能会用到，用于监控服务状态)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// 优先匹配后端接口，如果都不是，则将后续所有 GET 请求交给前端的 index.html (支持 SPA 路由前端接管)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path === '/health') {
    return next(); // API 路由交给下一个中间件 (404) 处理
  }
  res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
    if (err) {
      next(err);
    }
  });
});

// 处理404 (仅处理 API 未匹配到的情况)
app.use((req, res) => {
  res.status(404).json({ code: 404, data: null, message: '接口不存在' });
});

// 全局异常捕获中间件
app.use((err, req, res, next) => {
  console.error('发生未捕获的错误:', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    code: statusCode,
    data: null,
    message: err.message || '服务器内部错误'
  });
});

// 监听端口，需保证绑定到所有网络接口 0.0.0.0 (有助于 Docker / Zeabur 部署)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on http://0.0.0.0:${PORT}`);
});
