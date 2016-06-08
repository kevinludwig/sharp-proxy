### image-proxy

Resize and watermark image

### Setup

Install [node 6.2](https://nodejs.org/en/download/current/') or better

Install graphicsmagick and ghostscript:
``` 
brew install graphicsmagick
brew install ghostscript (fonts)
```

build and start:
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

### TODO

* fix the composite function -- it wants either the image or the watermark image to be on disk files
* cache to filesystem when resizing. Naming convention so everything doesnt end up in one directory
* /thumbnail endpoint should produce a small low res thumbnail as PNG 
* /preview should produde a larger image with watermark as PNG
* /download should provide the original image (original format, .tiff, .png, .jpeg, ...
* consider supporting other file formats such as psd with flatten
