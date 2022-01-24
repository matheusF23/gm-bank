FROM node:14-alpine

WORKDIR /usr/src/app/

COPY package.json .

RUN npm i

COPY ./src/ ./src/

CMD ["npm", "run", "dev"]
