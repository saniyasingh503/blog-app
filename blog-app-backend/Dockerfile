FROM node:alpine
 
WORKDIR /app
 
COPY ["package.json", "package-lock.json*", "./"]
 
RUN npm install
 
COPY ./src .
 
EXPOSE 3000
 
CMD [ "node", "server.js" ]