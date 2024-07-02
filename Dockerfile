FROM nginx

USER root
WORKDIR /usr/mydata/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/mydata/nginx/html/

EXPOSE 8001

CMD ["nginx", "-g", "daemon off;"]
