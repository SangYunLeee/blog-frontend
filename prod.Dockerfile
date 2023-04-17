# build environment
FROM node:14-alpine as build
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY postinstall.js .
RUN npm run postInstall

COPY . .

ARG ARG_REACT_APP_API_URL="https://www.enttolog.xyz"
ENV REACT_APP_API_URL=$ARG_REACT_APP_API_URL

ARG ARG_REACT_APP_PUBLIC_URL=""
ENV REACT_APP_PUBLIC_URL=$ARG_REACT_APP_PUBLIC_URL

ARG ARG_REACT_APP_WEATHER_API_KEY=""
ENV REACT_APP_WEATHER_API_KEY=$ARG_REACT_APP_WEATHER_API_KEY

RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]