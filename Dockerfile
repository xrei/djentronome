FROM keymetrics/pm2:latest-alpine

ADD . /app
WORKDIR /app

RUN npm install
RUN npm run build

#RUN ls -la

EXPOSE 7070

CMD ["pm2-runtime", "start", "process.yml"]