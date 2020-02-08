process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');
const knex = require('../src/config/connection');

describe('routes : View', () => {

    // beforeEach(() => {
    //     return knex.migrate.rollback()
    //         .then(() => { return knex.migrate.latest(); })
    //         .then(() => { return knex.seed.run(); });
    // });

    // afterEach(() => {
    //     return knex.migrate.rollback();
    // });

    // test route GET `/register`
    describe('GET /register', () => {
        it('Render the register view', (done) => {
            chai.request(server)
                .get('/register')
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('text/html');
                    res.text.should.contain('<h4 class="card-header">REGISTER</h4>');
                    done();
                });
        });
    });

    // test route POST `/register`
    describe('POST /register', () => {
        it('Register a new user', (done) => {
            chai.request(server)
                .post('/register')
                .send({
                    username: 'luongnguyen',
                    password: '123'
                })
                .end((err, res) => {
                    // should.not.exist(err);
                    // res.redirects[0].should.contain('/');
                    done();
                });
        });
    });

    // test route GET `/login`
    describe('GET /login', () => {
        it('Render the login view', (done) => {
            chai.request(server)
                .get('/login')
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('text/html');
                    res.text.should.contain('<h4 class="card-header">LOGIN</h4>');
                    done();
                });
        });
    });

    // test route POST `/login`
    describe('POST /login', () => {
        it('User login', (done) => {
            chai.request(server)
                .post('/login')
                .send({
                    username: 'luongnguyen',
                    password: '123'
                })
                .end((err, res) => {
                    res.redirects[0].should.contain('/');
                    done();
                });
        });
    });

    // test route GET `/logout`
    describe('GET /logout', () => {
        it('User logout', (done) => {
            chai.request(server)
                .get('/logout')
                .end((err, res) => {
                    res.redirects[0].should.contain('/login');
                    done();
                });
        });
    });
});
