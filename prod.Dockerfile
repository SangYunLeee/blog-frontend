# build environment
FROM node:14-alpine as build
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY postinstall.js .
RUN npm run postInstall

COPY . .
ARG ARG_REACT_APP_API_URL="https://api.entto.shop"
ARG ARG_REACT_APP_PUBLIC_URL=""
ARG ARG_REACT_APP_WEATHER_API_KEY=""

ENV REACT_APP_API_URL=$ARG_REACT_APP_API_URL
ENV REACT_APP_PUBLIC_URL=$ARG_REACT_APP_PUBLIC_URL
ENV REACT_APP_WEATHER_API_KEY=$ARG_REACT_APP_WEATHER_API_KEY

RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사한다.
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
