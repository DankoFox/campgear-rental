# Root Dockerfile (frontend)
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4028

CMD ["npm", "start"]
