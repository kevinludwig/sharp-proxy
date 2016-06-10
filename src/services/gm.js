import config from 'config'
import gm from 'gm'
import * as cache from './cache'

function identify(name) {
    return new Promise((resolve, reject) => {
        gm(config.imageRoot + name).identify(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function resize(name, w, h) {
    return new Promise((resolve, reject) => {
        gm(config.imageRoot + name)
            .resize(w, h)
            .toBuffer('PNG', function(err, buffer) {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
    });
}

function watermark(text, w, h) {
    return new Promise((resolve, reject) => {
        let out = cache.fileName(text, w, h);
        gm(w, h)
            .in('-background', 'transparent')
            .in('-fill', config.watermark.fillColor)
            .in('-font', config.watermark.fontName)
            .in('-pointsize', config.watermark.fontSize)
            .in('label:' + text)
            .in('-rotate', '-45')
            .write(out, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(out);
                }
            });
    });
}

function composite(image, watermark) {
    return new Promise((resolve, reject) => {
        // can't both be buffers here. Need to figure out something else.
        gm(image).composite(watermark)
            .dissolve('50')
            .gravity('northwest')
            .toBuffer('PNG', function(err, buffer) {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
    });
}

export {
    identify,
    resize,
    watermark,
    composite
}