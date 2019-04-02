FROM node:10

EXPOSE 8000

RUN npm install --global gatsby --no-optional gatsby@2.3

RUN mkdir -p /site
WORKDIR /site
VOLUME /site

COPY ./entry.sh /
RUN chmod +x /entry.sh
ENTRYPOINT ["/entry.sh"]
CMD ["develop"]