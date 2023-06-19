FROM node:16.20-alpine as development

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app

RUN yarn build


FROM node:16.20-alpine AS production

ARG version
ENV NODE_ENV=production
ENV VERSION=${version}

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
