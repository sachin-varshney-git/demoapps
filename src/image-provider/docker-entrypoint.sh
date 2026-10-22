#!/bin/sh
# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

# Copies the selected vertical's image set into /static at container start,
# so switching verticals (VERTICAL env var) only requires recreating this
# container -- no image rebuild needed. Falls back to "retail" if the
# requested vertical has no matching folder under static-src/.
set -e

VERTICAL_ID="${VERTICAL:-retail}"
SRC_DIR="/static-src/${VERTICAL_ID}"

if [ ! -d "$SRC_DIR" ]; then
  echo "image-provider: no static-src for VERTICAL='${VERTICAL_ID}', falling back to 'retail'"
  SRC_DIR="/static-src/retail"
fi

mkdir -p /static
rm -rf /static/*
cp -r "$SRC_DIR"/. /static/

envsubst '$OTEL_COLLECTOR_HOST $IMAGE_PROVIDER_PORT $OTEL_COLLECTOR_PORT_GRPC $OTEL_SERVICE_NAME' < /nginx.conf.template > /etc/nginx/nginx.conf
cat /etc/nginx/nginx.conf
exec nginx -g 'daemon off;'
