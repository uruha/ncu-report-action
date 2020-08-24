FROM node:12.14.1-alpine

WORKDIR /github/workspace

COPY package*.json ./
RUN npm install -g npm && \
    npm install --production

COPY . ./

RUN npm run build

RUN pwd
RUN ls ./
RUN ls ./dist

ENTRYPOINT [ "npm", "run", "exec" ]