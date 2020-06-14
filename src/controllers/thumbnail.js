const {identify,resize,watermark,composite} = require('../services/gm'),
    cache = require('../services/cache');

module.exports = async (ctx) => {
    const metadata = await identify(ctx.params.name);
    const {
        size: {
            width,
            height
        }
    } = metadata;

    const [w, h] = ctx.query.size ? ctx.query.size.split('x') : [width, height];

    const buffer = await resize(ctx.params.name, w, h);

    if (ctx.query.text) {
        let watermarkFile;
        const exists = await cache.exists(ctx.query.text, w, h);
        if (exists) {
            watermarkFile = cache.fileName(ctx.query.text, w, h);
        } else {
            watermarkFile = await watermark(ctx.query.text, w, h);
        }
        ctx.type = 'image/png';
        ctx.body = await composite(buffer, watermarkFile);
    } else {
        ctx.type = 'image/png';
        ctx.body = buffer;
    }
}
