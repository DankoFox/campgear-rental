# backend/Dockerfile
FROM node:20

WORKDIR /app

# copy and install dependencies
COPY package*.json ./
RUN npm install

# copy backend code
COPY . .

EXPOSE 5050

CMD ["node", "server.js"]
