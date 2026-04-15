FROM node:20

WORKDIR /backend

COPY package.json package-lock.json ./    

RUN npm ci                                

COPY . .

RUN npx prisma generate

EXPOSE 3000                               

CMD ["node", "src/app.js"]