import Router from 'koa-router'
import thumbnail from './controllers/thumbnail'
import config from 'config'

let router = new Router({
    prefix: config.prefix
});

router.get('/thumbnail/:name', thumbnail);

export default router.routes();