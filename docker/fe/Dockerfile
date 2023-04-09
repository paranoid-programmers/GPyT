FROM node:lts AS build-stage

WORKDIR /app
COPY ./src/fe/package* ./fe/

# Copy over the api client and build it
COPY ./src/apiclient/ ./apiclient/
WORKDIR /app/apiclient
RUN npm install
RUN npm run build

WORKDIR /app/fe
RUN npm install
COPY ./src/fe/ .
RUN npm run build

FROM nginx:stable

RUN apt-get update && apt-get install -y gettext-base
# clear apt cache
RUN rm -rf /var/lib/apt/lists/*

COPY --from=build-stage /app/fe/dist /usr/share/nginx/html
COPY ./docker/fe/nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
COPY ./docker/fe/custom-entrypoint.sh /custom-entrypoint.sh
RUN chmod +x /custom-entrypoint.sh

ENV BACKEND_URL=http://127.0.0.11/

ENTRYPOINT ["/custom-entrypoint.sh"]
