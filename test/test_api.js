const chai = require('chai'),
    request = require('supertest'),
    config = require('config'),
    app = require('../src/app');

const should = chai.should();

describe('image serving', () => {
    let server = null;

    before(async () => {
        server = await app();
    });
    after(() => {
        server.close();
    });

    it('should return 200 OK', async () => {
        await request(server)
            .get('/info/1')
            .expect(200);
    });
});
