#!/bin/sh
set -eu

escape_js_string() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

REST_HOST="$(escape_js_string "${REACT_APP_REST_HOST:-}")"
MEDIA_HOST="$(escape_js_string "${REACT_APP_MEDIA_HOST:-}")"
GOOGLE_MAPS_API_KEY="$(escape_js_string "${REACT_APP_GOOGLE_MAPS_API_KEY:-}")"

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__RUNTIME_CONFIG__ = {
  REACT_APP_REST_HOST: "${REST_HOST}",
  REACT_APP_MEDIA_HOST: "${MEDIA_HOST}",
  REACT_APP_GOOGLE_MAPS_API_KEY: "${GOOGLE_MAPS_API_KEY}"
};
EOF
