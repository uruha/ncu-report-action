FROM node:12.14.1-alpine

COPY package*.json ./
RUN npm install -g npm && \
    npm install --production

COPY . ./

RUN npm run build

RUN pwd
RUN ls ./
RUN ls ./lib

WORKDIR /github/workspace
COPY ./github/workspace/lib ./lib

ENTRYPOINT [ "npm", "run", "exec" ]