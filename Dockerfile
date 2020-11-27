FROM node:12

WORKDIR /app

COPY . /app

COPY ["package.json", "package-lock.json*"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]