const Router = require('koa-router'),
    image  = require('./controllers/image'),
    upload = require('./controllers/upload');

const router = new Router();

router.post('/upload', upload);
router.get('*', image);

module.exports = router.routes();
