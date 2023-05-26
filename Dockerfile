FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3333

CMD ["node","server.js"]

