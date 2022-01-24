FROM node:14.18.0 as build

ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#ARG BACKEND_URL="http://localhost:3000/"
#ENV BACKEND_URL=$BACKEND_URL
#
#RUN sed -i "s|http://localhost:3000|$BACKEND_URL|g" ./src/assets/env.js

RUN npm run-script build:prod
## STAGE 2

FROM nginx:1.17.1-alpine
#COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/dein-li-frontend /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
