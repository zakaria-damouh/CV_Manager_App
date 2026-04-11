FROM node:20

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["node", "src/app.js"]