FROM dget/dock-pynode:py3.7-node10

ARG SITE_NAME=site
ARG WORK_DIR="/${SITE_NAME}"
ARG GATSD_DIRNAME=gatsd
ARG GATSD_DIR="${WORK_DIR}/${GATSD_DIRNAME}"
ARG SHIM_DIR=/bin

RUN apt-get update \
    && apt-get install -yqq \
        ca-certificates \
        fftw-dev \
        g++ \
        gcc \
        git \
        make \
        openssl \
        yarn \
    && apt-get clean \
    && rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/* 

RUN yarn global add \
        gatsby-cli \
        netlify-cli \
        surge 

VOLUME ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY ${GATSD_DIRNAME}/_gatsd-shim ${SHIM_DIR}/gatsd
COPY ${GATSD_DIRNAME}/.bashrc ${GATSD_DIRNAME}/_entry.sh /

ENTRYPOINT ["/_entry.sh"]
CMD ["/usr/bin/env", "bash", "-l"]