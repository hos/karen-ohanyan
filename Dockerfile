FROM node:16-alpine3.12

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarn .yarn
COPY .yarnrc.yml .
COPY src src

RUN yarn install

CMD ["yarn", "start"]
