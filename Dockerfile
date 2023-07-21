FROM node:16-alpine

WORKDIR /client

COPY package.json ./

RUN npm install

RUN node -v

COPY . .

EXPOSE 3000

ARG REACT_APP_HOST

ENV REACT_APP_HOST $REACT_APP_HOST

CMD [ "npm", "start" ]
