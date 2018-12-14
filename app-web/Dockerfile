FROM node:8

RUN apt-get update && \
  yes | apt-get upgrade

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY . .

RUN npm ci --silent

EXPOSE 8000
CMD [ "npm", "run", "dev" ]