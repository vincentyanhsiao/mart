# Mart Artwork System (艺术品展示系统)

基于 Node.js Express、原生 HTML/CSS/JavaScript 以及 MySQL 8.0 构建的全栈艺术品展示系统。
项目支持本地双端开发体验，并已针对 Zeabur 平台进行了自动化部署适配。

## 📁 项目结构
```text
mart/
├── frontend/          # 前端：展示页面 (Vite + HTML/CSS/JS)
├── backend/           # 后端：API 服务器 (Express + MySQL)
├── sql/               # 数据库：初始化 SQL 脚本
├── .env.example       # 环境变量模板
└── zeabur.json        # Zeabur 部署配置
```

## 🚀 本地开发全流程

### 1. 环境准备
- 确保已安装 **Node.js 18+**。
- 确保本地 **MySQL 8.0+** 已运行。

### 2. 数据库初始化
在 MySQL 终端中执行：
```bash
mysql -u root -p < sql/init.sql
```

### 3. 启动后端 (API 服务)
```bash
cd backend
npm install
npm start
```
*后端将监听 `http://localhost:3000` 并托管前端静态文件。*

### 4. 启动前端 (开发模式)
```bash
cd frontend
npm install
npm run dev
```
*前端开发服务器运行在 `http://localhost:5173`，所有 `/api` 请求将代理至后端。*

## 📤 GitHub 同步指令
```bash
git add .
git commit -m "feat: complete fullstack artwork system with list and detail pages"
git push origin main
```

## ☁️ Zeabur 部署指南
1. 在 Zeabur 中创建 **MySQL** 服务并执行 `sql/init.sql`。
2. 连接您的 GitHub 仓库创建代码服务。
3. 在代码服务的 **Variables** 中配置以下变量：
   - `PORT`: 3000
   - `MYSQL_HOST`: (MySQL 服务的内网名)
   - `MYSQL_DATABASE`: mart_artwork
   - `MYSQL_USER`: root
   - `MYSQL_PASSWORD`: (数据库密码)
4. 绑定域名后即可访问。
