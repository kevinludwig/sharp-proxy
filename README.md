### image-proxy

Resize and watermark image

### Setup

Install [node 6.2](https://nodejs.org/en/download/current/') or better

```
npm install
npm test
npm start
```

### Docker setup

* Install [Docker](https://www.docker.com/products/docker-toolbox)
* Create a docker VM `docker-machine create --driver virtualbox default`
* Put the following in your `.bash\_profile`: `eval "$(docker-machine env default)"`
* build a docker container for this project: `docker build -t image-proxy`
* run it: `docker run -i -t image-proxy`

