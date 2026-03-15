# Artworks Exhibition System (艺术品展示系统)

基于 React / Vite 和 Node.js (Express) + MySQL 8.0 构建的全栈艺术品展示系统。
支持双端本地开发和无缝通过单服务部署至 Zeabur 平台。

## 目录结构
- `frontend/`: React + Vite 前端。开发环境请求经 Vite 代理 `/api` 转发。
- `backend/`: Node.js Express 后端。连接数据库提供 API 请求，并且在生产环境负责伺服前端打包后的静态资源。
- `sql/`: 数据库初始化与测试数据脚本。

## 1. 本地开发指南

### 1.1 数据库初始化
1. 确保安装原生 MySQL 8+ 环境。
2. 登录 MySQL 命令行或使用可视化工具执行脚本，以创建数据库和表：
   ```bash
   mysql -u root -p < sql/init.sql
   ```

### 1.2 后端启动 (API 服务器)
1. 将 `.env.example` 复制为 `.env` 至 `backend/` 及项目根目录中，确认本机端口与数据库账号密码。
   ```bash
   cp .env.example .env
   cp .env.example backend/.env
   ```
2. 进入后端目录安装依赖并启动：
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   > 此时后端服务将默认监听 `http://localhost:3000`

### 1.3 前端启动 (Web 客户端)
1. 开启一个独立终端，进入前端目录安装依赖并启动：
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. 访问控制台给出的地址 (如 `http://localhost:3001` )，此时页面的 API 请求会自动走代理发送给后端服务器。

## 2. GitHub 推送与 Zeabur 部署配置说明

项目根目录配置了 `zeabur.json` 支持作为单一 NodeJS 服务一键部署。在 Zeabur 构建时，该配置会自动同时安装前端与后端依赖，并将前端构建输出，最后以后端的 `app.js` 启动整个服务进行双端接管。

### 提交至 GitHub
```bash
git add .
git commit -m "feat: init fullstack artwork system"
git branch -M main
git remote add origin https://github.com/vincentyanhsiao/mart.git
git push -u origin main
```

### Zeabur 控制台部署步骤
1. **创建服务**: 登录 Zeabur Dashboard，在您的 Project 中添加服务，选择部署 GitHub 仓库 `vincentyanhsiao/mart`。
2. **环境变量设置**: 在新建的 Service 环境变量页面配置您的生产数据库参数：
   - `PORT`: 3000
   - `MYSQL_HOST`: 您的 MySQL 主机地址
   - `MYSQL_USER`: 数据库用户名
   - `MYSQL_PASSWORD`: 数据库密码
   - `MYSQL_DATABASE`: mart_artwork
   - `MYSQL_PORT`: 通常是 3306

部署完成后，在 `Domains` 面板配置或生成一个域名即可进行公网访问！
