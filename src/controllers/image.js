const path = require('path'),
    config = require('config'),
    {resize} = require('../services/sharp'),
    {getObject, headObject, putObject} = require('../services/s3'),
    cache = require('../services/cache');

const format = (ext) => {
    switch (ext) {
        case 'png':
            return 'image/png';
        case 'jpg':
            return 'image/jpg';
        case 'tiff':
            return 'image/tiff';
        case 'webp':
            return 'image/webp';
        default:
            return null;
    }
};

module.exports = async (ctx) => {
    const width = ctx.query.width && +ctx.query.width;
    const height = ctx.query.height && +ctx.query.height;
    
    const ext = path.extname(ctx.request.path);
    const file = ctx.request.path.replace(ext, '');
    const cacheFile = path.join(config.cacheRoot, file);
    const exists = await headObject(cache.key(cacheFile, width, height, ext));
    if (exists) {
        ctx.type = format(ext);
        ctx.body = getObject(cacheFile)
    } else {
        const stream = getObject(file);
        const buffer = resize(stream, width, height, ext.substr(1))
        await putObject(cacheFile, buffer);

        ctx.type = format(ext.substr(1));
        ctx.body = buffer;
    }
}
