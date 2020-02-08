process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');
const knex = require('../src/config/connection');

describe('routes : API REGISTER - LOGIN', () => {

    // test route POST `/api/register`
    describe('POST /api/register', () => {
        it('Register a new user', (done) => {
            chai.request(server)
                .post('/api/register')
                .send({
                    username: 'luongnguyen',
                    password: '123'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(400);
                    res.type.should.equal('application/json');
                    res.body.should.include.keys(
                        'code', 'message'
                    );
                    done();
                });
        });
    });

    // test route POST `/api/login`
    describe('POST /api/login', () => {
        it('User login', (done) => {
            chai.request(server)
                .post('/api/login')
                .send({
                    username: 'luongnguyen',
                    password: '123'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(400);
                    res.type.should.equal('application/json');
                    res.body.should.include.keys(
                        'code', 'message'
                    );
                    done();
                });
        });
    });
});
