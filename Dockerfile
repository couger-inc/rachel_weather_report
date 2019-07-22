FROM node:11.15.0-alpine
WORKDIR /code
COPY package.json .
RUN npm install --quiet
RUN npm audit fix
