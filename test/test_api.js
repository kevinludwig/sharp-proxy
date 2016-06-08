import sinon from 'sinon'
import 'sinon-as-promised'
import chai from 'chai'
import restify from 'restify-clients'
import config from 'config'
import app from '../app'

const should = chai.should();

let client = restify.createJsonClient({
    url: 'http://localhost:' + config.port,
    retry: {
        retries: 0
    },
    connectTimeout: 500,
    requestTimeout: 500,
    agent: false
});

describe(config.prefix + '/info/:id', () => {
    let server = null,
        sandbox;

    before((done) => {
        server = app(done);
    });
    after(() => {
        server.close();
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return 200 OK', (done) => {
        client.get(config.prefix + '/info/1', (err, req, res) => {
            res.statusCode.should.be.eql(200);
            done();
        });
    });
});
