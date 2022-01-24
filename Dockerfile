FROM mongo

EXPOSE 27017

ENV PUID=1000
ENV PGID=1000

FROM node:14-alpine

EXPOSE 3333

WORKDIR /usr/src/app/

COPY package.json .

RUN npm i

COPY ./src/ ./src/

CMD ["npm", "run", "dev"]
