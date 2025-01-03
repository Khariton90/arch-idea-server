FROM node:21-slim
RUN apt-get update && apt-get install -y openssl libssl-dev
WORKDIR /opt/arch-idea
COPY ./dist/package.json .
RUN npm install
COPY ./dist/prisma/schema.prisma ./prisma/schema.prisma


RUN npx prisma generate --schema ./prisma/schema.prisma
COPY ./dist .

CMD ["node", "./main.js"]
