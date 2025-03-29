FROM node:20.14

WORKDIR /usr/local/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]