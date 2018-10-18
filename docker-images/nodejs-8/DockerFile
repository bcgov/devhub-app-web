FROM "__FROM_IMAGE_STREAM_DEFINED_IN_TEMPLATE__"

# Install project dependencies
COPY package.json ${APP_ROOT}/app-web
COPY package-lock.json ${APP_ROOT}/app-web
RUN source ${APP_ROOT}/etc/scl_enable && cd ${APP_ROOT}/app-web && npm install
