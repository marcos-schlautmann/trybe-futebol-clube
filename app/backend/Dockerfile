FROM node:16.14

WORKDIR /app-backend

COPY ./backend/package.json ./
COPY ./backend/package-lock.json ./

RUN npm install

COPY ./backend/src ./src

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]
