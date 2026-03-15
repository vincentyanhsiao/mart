# 使用 Node.js 官方镜像
FROM node:18-slim

# 设置工作目录
WORKDIR /app

# 1. 复制根目录的 package.json
COPY package.json ./

# 2. 安装所有依赖
# 使用 --production 减少镜像体积，但为了确保所有工具可用，这里保持简练
RUN npm install

# 3. 复制项目所有源代码
COPY . .

# 4. 设置环境变量默认值（可在 Zeabur 控制台覆盖）
ENV PORT=3000
ENV NODE_ENV=production

# 5. 暴露服务端口
EXPOSE 3000

# 6. 启动后端应用
# 注意：路径相对于工程根目录
CMD ["node", "backend/app.js"]
