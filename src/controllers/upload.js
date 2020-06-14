const config = require('config'),
    fs = require('fs'),
    {promisify} = require('util'),
    path = require('path');

const rename = promisify(fs.rename);

module.exports = async (next) => {
    ctx.assert(ctx.request.body, 'missing post body', 400);
    ctx.assert(ctx.request.body.files, 'missing files', 400);
    ctx.assert(ctx.request.body.fields, 'missing form fields', 400);

    const files = ctx.request.body.files.uploads;
    if (!Array.isArray(files)) files = [files];

    const pairs = files.map((f) => {
        return [f.path, path.join(config.imageRoot, f.name)];
    });

    await Promise.all(pairs.map(pair => rename(...pair)));

    const [
        [_, firstFile], ...more
    ] = pairs;

    ctx.response.redirect('/thumbnail/' + path.basename(firstFile));
}
