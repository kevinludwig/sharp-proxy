import {
    identify,
    resize,
    watermark,
    composite
} from '../services/gm'
import * as cache from '../services/cache'

export default function*() {
    let self = this;
    let metadata = yield identify(this.params.name);
    let {
        size: {
            width,
            height
        }
    } = metadata;

    let [w, h] = this.query.size ? this.query.size.split('x') : [width, height];

    let buffer = yield resize(this.params.name, w, h);

    if (this.query.text) {
        let watermarkFile;
        let exists = yield cache.exists(this.query.text, w, h);
        if (exists) {
            watermarkFile = cache.fileName(this.query.text, w, h);
        } else {
            watermarkFile = yield watermark(this.query.text, w, h);
        }
        this.type = 'image/png';
        this.body = yield composite(buffer, watermarkFile);
    } else {
        this.type = 'image/png';
        this.body = buffer;
    }
}