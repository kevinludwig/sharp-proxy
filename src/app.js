const Koa = require('koa'),
    koaBody = require('koa-body'),
    cors = require('@koa/cors'),
    config = require('config'),
    log = require('./logger'),
    routes = require('./routes'),
    app = new Koa();

app.use(async(ctx, next) => {
    try {
        await next();
    } catch (ex) {
        log.error(ex.message, ex.stack);
        ctx.status = 500;
    }
});

app.use(koaBody({multipart: true}));
app.use(cors({
    credentials: true
}));
app.use(routes);

module.exports = () => {
    return new Promise((resolve) => {
        const server = app.listen(config.port, () => resolve(server));
    });
}
