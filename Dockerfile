FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm run build

COPY ./dist ./

CMD ["node","main"]