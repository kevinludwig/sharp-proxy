const crypto = require('crypto');

const key = (...args) => {
    return crypto.createHash('md5').update(args.join(':')).digest('hex');
}

module.exports = {
    key
}
