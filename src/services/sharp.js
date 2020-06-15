const config = require('config'),
    sharp = require('sharp'),
    cache = require('./cache');

const metadata = (name) => sharp(config.imageRoot + name).metadata();

const resize = (stream, width, height) => {
    return sharp(stream)
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
