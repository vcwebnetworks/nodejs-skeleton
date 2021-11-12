FROM node:16-alpine

# set environments
ENV TZ=America/Sao_Paulo
ENV NPM_CONFIG_LOGLEVEL=warn

# update system and install tz
RUN apk add --update --no-cache bash tzdata python3 alpine-sdk && rm -rf /var/cache/apk/*

# install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# set non-root user
ENV USER=node
USER ${USER}

# set workdir
ENV WORKDIR=/home/node/app
WORKDIR ${WORKDIR}
