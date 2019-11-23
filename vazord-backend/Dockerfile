FROM node:12
WORKDIR /app
COPY . .
ENV NODE_ENV heroku
ENV DATABASE_URL postgres://ofsvsneglfuaep:4086875ca67668b8c5d5f9b8031209f29b8dd431cd9e7f2f54053c5d5c414ffd@ec2-184-73-176-11.compute-1.amazonaws.com:5432/d37bivntj1ldkh
RUN npm install
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

CMD ["node", "src/index.js"]
