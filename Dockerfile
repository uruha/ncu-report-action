FROM node:12.14.1-alpine

COPY package*.json /
RUN npm install -g npm && \
    npm install --production

COPY . /

ENTRYPOINT [ "npm", "run", "exec" ]