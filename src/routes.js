const Router = require('koa-router'),
    image  = require('./controllers/image'),
    upload = require('./controllers/upload');

const router = new Router();

router.get('/*', image);
router.post('/upload', upload);

module.exports = router.routes();
