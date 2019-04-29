FROM node:10

ARG NODE_MAJOR_VERSION=10
ARG NODE_VERSION=10.15.3
ARG GIT_REF=0

ENV SUMMARY="BC Gov DevHub "  \
  DESCRIPTION="BC Gov DevHub web application running in nodejs version ${NODE_VERSION}"
ENV LC_ALL=en_US.UTF-8 \
  LANG=en_US.UTF-8

ENV INSTALL_PATH /site
ENV GIT_REF $GIT_REF

LABEL summary="$SUMMARY" \
  description="$DESCRIPTION" \
  git_ref="$GIT_REF"

RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

COPY app-web/package.json $INSTALL_PATH
COPY app-web/package-lock.json $INSTALL_PATH

RUN npm install ci

EXPOSE 8000

CMD [ "npm", "run", "dev" ]

