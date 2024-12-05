# Node
FROM node:20-alpine

# アーティファクトをコピー
COPY dist ./dist
COPY package*.json ./

# 依存をインストール
RUN npm install --production

# アプリのエンドポイント
CMD ["node", "dist/main.js"]

# コンテナのポートを公開
EXPOSE 8082
