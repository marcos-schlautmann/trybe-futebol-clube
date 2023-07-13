FROM node:16.14

WORKDIR /app-frontend

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

RUN npm install

COPY ./frontend/src ./src

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]
