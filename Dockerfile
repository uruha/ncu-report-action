FROM node:12.14.1-alpine

COPY package*.json ./
RUN npm install -g npm && \
    npm install --production

COPY . ./

RUN npm run build

RUN pwd
RUN ls ./
RUN ls ./dist

COPY dist/index.js /dist/index.js

ENTRYPOINT [ "npm", "run", "exec" ]