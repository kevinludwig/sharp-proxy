const {metadata,resize} = require('../services/sharp'),
    cache = require('../services/cache');

module.exports = async (ctx) => {
    const { 
        size: {
            width,
            height
        }
    } = await metadata(ctx.params.name);

    const [w, h] = ctx.query.size ? ctx.query.size.split('x') : [width, height];

    const buffer = await resize(ctx.params.name, w, h);

    ctx.type = 'image/png';
    ctx.body = buffer;
}
