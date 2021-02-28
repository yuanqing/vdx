FROM node:lts-alpine

COPY package.json tsconfig.json yarn.lock src/ /src/

#hadolint ignore=DL3018
RUN apk add --no-cache ffmpeg


WORKDIR /src
#hadolint ignore=DL3016
RUN npm install --global vdx


VOLUME [ "/files" ]
WORKDIR /files
ENTRYPOINT [ "vdx" ]
