FROM node:25.5.0-slim

WORKDIR /app/my-app

COPY ./my-app/package*.json ./

RUN npm ci --include=optional
RUN npm i -g serve

COPY ./my-app/ .
RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist", "-l", "3000" ]