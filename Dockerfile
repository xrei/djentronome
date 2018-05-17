FROM keymetrics/pm2:latest-alpine

ADD . /app
WORKDIR /app

RUN npm i -g npm@latest
RUN npm install
RUN npm run build

EXPOSE 7070

CMD ["pm2-runtime", "start", "process.yml"]