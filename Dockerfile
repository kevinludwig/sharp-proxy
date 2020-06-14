FROM node:12

ENV APP_ROOT /opt/app
RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

ADD package.json $APP_ROOT
ADD package-lock.json $APP_ROOT
RUN npm install --production

COPY config $APP_ROOT/config
COPY src $APP_ROOT/src

EXPOSE 8080 
CMD ["node", "build/boot.js"]
