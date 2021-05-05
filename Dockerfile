FROM node:14-alpine

# set environments
ENV TZ=America/Sao_Paulo
ENV NPM_CONFIG_LOGLEVEL=warn
ENV WORKDIR=/home/app

# create directory app and permission
RUN mkdir -p /home/app/node_modules && \
    chown -R node:node /home/app

# copy package.json and yarn lock
COPY --chown=node:node ./package.json  ./yarn.* ./

# update system and install tz
# install node_modules and clean cache
RUN apk add --update --no-cache tzdata python alpine-sdk && \
    yarn install && \
    yarn cache clean && \
    rm -rf /var/cache/apk/*

# copy all project files to working directory
COPY --chown=node:node . .
RUN chown -R 1000.1000 ${WORKDIR}

EXPOSE 3333

# start application
USER node
WORKDIR ${WORKDIR}
CMD ["npm", "run", "start"]
