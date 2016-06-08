FROM node:6.2-wheezy

ENV APP_ROOT /opt/app
RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

ADD package.json $APP_ROOT
RUN npm install

COPY config $APP_ROOT/config
COPY src $APP_ROOT/src
ADD gulpfile.js $APP_ROOT
ADD .eslintrc $APP_ROOT
RUN npm run build

EXPOSE 8080 
CMD ["node", "build/boot.js"]
