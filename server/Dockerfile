FROM node:10.15.3-alpine
ENV NODE_ENV=production

WORKDIR /srv/www/server/

COPY ./server/ . 

RUN apk add --no-cache g++ make python && \
  npm install && \
  npm cache clean --force 

EXPOSE 3000

CMD npm run start