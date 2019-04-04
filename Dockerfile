FROM node:10

EXPOSE 8000

#RUN npm install --global gatsby --no-optional gatsby@2.3

RUN mkdir -p /site
WORKDIR /site
#VOLUME /site
COPY app-web/package.json /site

RUN cd /site && npm install ci

CMD [ "npm", "run", "dev" ]

#COPY ./entry.sh /
#RUN chmod +x /entry.sh
#ENTRYPOINT ["/entry.sh"]
#CMD ["develop"]