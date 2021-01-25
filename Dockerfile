FROM node:14-alpine

# set environments
ENV TZ=America/Sao_Paulo
ENV NPM_CONFIG_LOGLEVEL=warn

# create directory app and permission
RUN mkdir -p /home/api/node_modules
RUN chown -R node:node /home/api

# set workdir application
WORKDIR /home/api

# copy package.json and yarn lock
COPY --chown=node:node ./package.json ./

RUN apk add --update --no-cache tzdata && \
    yarn install && yarn cache clean && \
    rm -rf /var/cache/apk/*

# copy all project files to working directory
COPY --chown=node:node . .
# RUN chown -R node:1000 /home/api

# set user
USER node

# start application
CMD ["npm", "run", "start"]
