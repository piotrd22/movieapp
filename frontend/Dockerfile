FROM alpine:latest AS builder
WORKDIR /usr/app
RUN apk update
RUN apk upgrade
RUN apk add --update nodejs npm
COPY . .
RUN npm install
RUN npm run build


FROM nginx:latest
COPY --from=builder /usr/app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .env .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]