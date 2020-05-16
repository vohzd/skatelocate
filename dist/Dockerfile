FROM nginx:1.13.9-alpine
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY /src /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
