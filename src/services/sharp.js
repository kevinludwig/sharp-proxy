const config = require('config'),
    sharp = require('sharp'),
    cache = require('./cache');

const metadata = (name) => sharp(config.imageRoot + name).metadata();

const resize = (name, width, height) => {
    return sharp(config.imageRoot + name)
        .resize({
            width,
            height,
            options: {
                fit: 'outside'
            }
        })
        .toFormat('png')
        .toBuffer()
};

module.exports = {
    metadata,
    resize
};
