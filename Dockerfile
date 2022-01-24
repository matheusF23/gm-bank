FROM node:14-alpine

EXPOSE 3333

WORKDIR /usr/src/app/

COPY package.json .

RUN npm i

COPY ./src/ ./src/

CMD if [ "$NODE_ENV" = "dev" ]; \
  then npm run dev;  \
  else npm start; \
  fi
