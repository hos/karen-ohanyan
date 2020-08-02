FROM node:14-alpine3.12

RUN apk add --no-cache make gcc g++ python3 curl openssh bash

WORKDIR /app

ADD ./scripts/heroku-exec.sh /app/.profile.d/
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY package.json .
COPY yarn.lock .
COPY .yarn .yarn
COPY .yarnrc.yml .
COPY src src

RUN yarn install

CMD bash /app/.profile.d/heroku-exec.sh && yarn start
