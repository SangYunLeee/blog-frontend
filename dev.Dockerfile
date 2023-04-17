# build environment
FROM node:14-alpine
WORKDIR /app

COPY package*.json .

RUN npm ci

COPY postinstall.js .
RUN npm run postInstall

COPY . .

ENV REACT_APP_API_URL="https://www.enttolog.xyz"
ENV REACT_APP_PUBLIC_URL=""
ENV REACT_APP_WEATHER_API_KEY=""
CMD ["npm", "run", "start-dev"]