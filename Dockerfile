FROM node:12.14.1-alpine

COPY package*.json ./
RUN npm install -g npm && \
    npm install --production

COPY . ./

RUN npm run build

RUN pwd
RUN ls ./
RUN ls ./dist

WORKDIR /github/workspace

COPY ./dist ./dist

ENTRYPOINT [ "npm", "run", "exec" ]