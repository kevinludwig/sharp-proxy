import fs from 'fs'
import config from 'config'

function fileName(text, w, h) {
    return `${config.cacheRoot}/${text.replace(' ', '_')}_${w}x${h}.png`;
}

function* exists(text, w, h) {
    return new Promise((resolve, reject) => {
        fs.exists(fileName(text, w, h), resolve);
    });
}

export {
    fileName,
    exists
}