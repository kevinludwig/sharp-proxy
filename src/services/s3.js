const AWS = require('aws-sdk'),
    config = require('config'),
    Bucket = config.bucket,
    s3 = new AWS.S3(config.s3);

const getObject = (Key) => {
    return s3.getObject({
        Bucket,
        Key
    }).createReadStream();
};

const putObject = (Key, Body) => {
    return s3.putObject({
        Bucket,
        Key,
        Body
    })
};

const headObject = async (Key) => {
    try {
        await s3.headObject({
            Bucket,
            Key
        });
    } catch (ex) {
        return false;
    }
};

module.exports = {
    getObject,
    putObject,
    headObject
};
