FROM node:14-alpine

# set environments
ENV TZ=America/Sao_Paulo
ENV NPM_CONFIG_LOGLEVEL=warn

# update system and install tz
RUN apk add --update --no-cache tzdata

# create directory app and permission
RUN mkdir -p /home/api/node_modules && chown -R node:node /home/api

# set workdir application
WORKDIR /home/api

# copy package.json and yarn lock
COPY --chown=node:node ./package.json  ./yarn.* ./

# set user
USER node

# install node_modules and clean cache
RUN yarn install && yarn cache clean && rm -rf /var/cache/apk/*

# copy all project files to working directory
COPY --chown=node:node . .
RUN chown -R node:1000 /home/api

# start application
CMD ["npm", "run", "start"]
