const fs = require('fs'),
    config = require('config');

const fileName = (text, w, h) => {
    return `${config.cacheRoot}/${text.replace(' ', '_')}_${w}x${h}.png`;
}

const exists = async (text, w, h) => {
    return new Promise((resolve, reject) => {
        fs.exists(fileName(text, w, h), resolve);
    });
}

module.exports = {
    fileName,
    exists
}
