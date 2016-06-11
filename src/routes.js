import Router from 'koa-router'
import thumbnail from './controllers/thumbnail'
import upload from './controllers/upload'
import config from 'config'

let router = new Router({
    prefix: config.prefix
});

router.get('/thumbnail/:name', thumbnail);
router.post('/upload', upload);

export default router.routes();