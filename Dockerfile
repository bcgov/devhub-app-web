FROM node:10

EXPOSE 8000

RUN mkdir -p /site
WORKDIR /site
COPY app-web/package.json /site
COPY app-web/package-lock.json /site

RUN cd /site && npm install ci

CMD [ "npm", "run", "dev" ]

