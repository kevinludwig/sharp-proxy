const path = require('path'),
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
    const {w, h} = ctx.query;
    const ext = path.extname(ctx.request.path);
    const file = ctx.request.path.replace(ext, '');
    const cacheFile = path.join(config.cacheRoot, file);
    const exists = await headObject(cache.key(cacheFile, w, h, ext));
    if (exists) {
        ctx.type = format(ext);
        ctx.body = getObject(cacheFile)
    } else {
        const stream = getObject(file);
        const buffer = resize(stream, w, h, ext.substr(1))
        await putObject(cacheFile, buffer);

        ctx.type = format(ext.substr(1));
        ctx.body = buffer;
    }
}
