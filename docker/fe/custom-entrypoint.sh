#!/bin/sh

# Replace environment variables in the Nginx configuration file
envsubst "$(env | awk -F = '{printf " $%s", $1}')" < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx
exec nginx -g "daemon off;"
