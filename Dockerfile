FROM node:12-alpine

RUN mkdir -p /home/api/node_modules && chown -R node:node /home/api

WORKDIR /home/api

COPY --chown=node:node package.json ./

RUN npm install

COPY --chown=node:node . .

USER node

CMD ["npm", "run", "start"]
