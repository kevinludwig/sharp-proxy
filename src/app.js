import Koa from 'koa'
import body from 'koa-body'
import helmet from 'koa-helmet'
import toobusy from 'koa-toobusy'
import responseTime from 'koa-response-time'
import cors from 'koa-cors'
import gracefulShutdown from 'http-graceful-shutdown'
import ping from 'koa-ping'
import errorHandler from 'koa-err'
import accesslog from 'koa-accesslog'
import staticfiles from 'koa-static'
import config from 'config'
import log from './logger'
import routes from './routes'

let app = Koa();

app.use(errorHandler(function(e) {
    log.error(e);
    this.body = e.message;
    this.status = e.status || 500;
}));

app.use(responseTime());
app.use(accesslog());
app.use(toobusy());
app.use(helmet());
app.use(staticfiles('public'));
app.use(body({
    multipart: true
}));
app.use(cors());
app.use(ping(config.prefix + '/ping'));

app.use(routes);

function noop() {}

export default (ready = noop) => {
    let server = app.listen(config.port, () => {
        log.info('listening on ' + config.port);
        ready();
    });

    gracefulShutdown(server, {
        timeout: config.shutdownTimeout
    });

    return server;
}