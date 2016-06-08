import gm from 'gm'

function identify(name) {
    return new Promise((resolve, reject) => {
        gm('images/' + name).identify(function(err, data) {
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
        gm('images/' + name)
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
        gm()
            .background'transparent')
            .fill('gray')
            .font('Helvetica')
            .fontSize(18)
            .rawSize(w,h)
            .in('label:' + text)
            .in('-rotate', '-45')
            .toBuffer('PNG', function(err, buffer) {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
    });
}

function composite(image, watermark) {
    return new Promise((resolve, reject) => {
        // can't both be buffers here. Need to figure out something else.
        gm(image).composite(watermark)
            .dissolve('50%')
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

export {identify, resize, watermark, composite}
