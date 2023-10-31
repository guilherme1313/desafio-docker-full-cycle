FROM node:latest

WORKDIR /app

RUN apt-get update 

COPY package*.json ./

RUN npm install

COPY app.js /app

EXPOSE 3000

CMD ["node", "app.js"]
