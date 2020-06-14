const Router = require('koa-router'),
    thumbnail = require('./controllers/thumbnail'),
    upload = require('./controllers/upload');

const router = new Router();

router.get('/thumbnail/:name', thumbnail);
router.post('/upload', upload);

module.exports = router.routes();
