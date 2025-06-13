# Dockerfile para backend NestJS (Cloud Run Ready)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

# Porta padrão do NestJS/Cloud Run
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main.js"]
