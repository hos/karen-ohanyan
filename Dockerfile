FROM node:14-alpine3.12

WORKDIR /app

RUN apk add --no-cache bash
ADD ./scripts/heroku-exec.sh /app/.profile.d/
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY package.json .
COPY yarn.lock .
COPY .yarn .yarn
COPY .yarnrc.yml .
COPY src src

RUN yarn install

CMD ["yarn", "start"]
