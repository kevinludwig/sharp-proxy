import {identify, resize, watermark, composite} from '../services/gm'

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
        let wbuffer = yield watermark(this.query.text, w, h);

        this.type = 'image/png';
        this.body = yield composite(buffer, wbuffer);
    } else {
        this.type = 'image/png';
        this.body = buffer;
    }
}
