
## NodeJS 18.17 LTS sử dụng image node 18.17 làm base image 
# https://hub.docker.com/layers/library/node/18.17-alpine/images/sha256-ef5e088232f803cadb83326edb4731015f42961d23a11510b109c2c98cfbb945?context=explore

# Giai đoạn build
FROM node:17-alpine as build
WORKDIR /app

# COPY package*.json .
COPY . .
RUN npm install -g npm@10.1.0
RUN npm run build-windows

FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000
