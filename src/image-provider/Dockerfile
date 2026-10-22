# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

FROM docker.io/nginxinc/nginx-unprivileged:1.29.3-alpine3.22-otel@sha256:208c0b691a676e6ad05fb7737852d1c307baf5903c8c4552c7ce5b60e36c40e6

COPY src/image-provider/static-src/ /static-src/
COPY src/image-provider/nginx.conf.template /nginx.conf.template
COPY src/image-provider/docker-entrypoint.sh /docker-entrypoint.sh

# /static is populated at container start (see docker-entrypoint.sh) by
# copying the selected vertical's folder out of /static-src, so it needs to
# be writable by the unprivileged runtime user set up below.
RUN mkdir -p /static && \
    chown -R 101:0 /static /static-src && \
    chmod -R g=u /static /static-src && \
    chmod +x /docker-entrypoint.sh

USER 101

ARG IMAGE_PROVIDER_PORT=8081
EXPOSE ${IMAGE_PROVIDER_PORT}

STOPSIGNAL SIGQUIT

# Copies the vertical (VERTICAL env var) selected image set into /static, then starts nginx
CMD ["/bin/sh", "/docker-entrypoint.sh"]
