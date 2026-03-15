# 使用 Node.js 官方镜像
FROM node:22-slim

# 设置工作目录
WORKDIR /app

# 1. 复制所有配置文件
COPY package.json ./
COPY backend/package.json ./backend/

# 2. 安装后端依赖 (关键步骤)
RUN npm install --prefix backend

# 3. 复制项目所有源代码
COPY . .

# 4. 设置环境变量
ENV PORT=3000
ENV NODE_ENV=production

# 5. 暴露服务端口
EXPOSE 3000

# 6. 启动服务
CMD ["npm", "start", "--prefix", "backend"]
