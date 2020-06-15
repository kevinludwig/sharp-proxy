const config = require('config'),
    crypto = require('crypto'),
    fs = require('fs'),
    path = require('path'),
    {promisify} = require('util'),
    sharp = require('sharp'),
    {putObject} = require('../services/s3');

const readFile = promisify(fs.readFile.bind(fs));

const first = (a) => (a && a.length) ? a[0] : a;

module.exports = async (ctx) => {
    ctx.assert(ctx.request.body, 'missing post body', 400);
    ctx.assert(ctx.request.files, 'missing files', 400);
    ctx.assert(ctx.request.path, 'missing form fields', 400);

    const file = ctx.request.files.uploads && first(ctx.request.files.uploads);

    const content = await readFile(file.path);
    const contentHash = crypto.createHash('md5').update(content).digest('hex');
    const uploadName = path.join(ctx.request.body.path, contentHash);
    await putObject(uploadName, content);
    
    const data = await sharp(content).metadata();
    ctx.body = {
        name: uploadName,
        size: data.size,
        width: data.width,
        height: data.height
    };
}
