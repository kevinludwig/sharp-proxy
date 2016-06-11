import config from 'config'
import fs from 'fs'
import path from 'path'
import promisify from 'es6-promisify'

const rename = promisify(fs.rename);

export default function*(next) {
    this.assert(this.request.body, 'missing post body', 400);
    this.assert(this.request.body.files, 'missing files', 400);
    this.assert(this.request.body.fields, 'missing form fields', 400);

    let files = this.request.body.files.uploads;
    if (!Array.isArray(files)) files = [files];

    let pairs = files.map((f) => {
        return [f.path, path.join(config.imageRoot, f.name)];
    });

    yield pairs.map(function(pair) {
        return rename(...pair);
    });

    let [
        [_, firstFile], ...more
    ] = pairs;

    this.response.redirect('/image-proxy/v1/thumbnail/' + path.basename(firstFile));
}