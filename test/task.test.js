process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');
const knex = require('../src/config/connection');

describe('routes : API Task', () => {
    
    // test route POST `/auth/task`
    describe('POST /api/task', () => {
        it('API get all task for user', (done) => {
            chai.request(server)
                .post('/api/task')
                .send({
                    userid: 30
                })
                .end((err, res) => {
                    // there should an error
                    should.exist(err);
                    // there should be a 401 status code
                    res.should.have.status(401);
                    // the response should be JSON
                    res.should.have.type('application/json');
                    // // the JSON response body should have a
                    // // key-value pair of {"data": list task object}
                    // res.body.task.should.include.keys(
                    //     'id', 'taskname', 'description', 'createdate', 'modifydate', 'iscomplete'
                    // );
                    done();
                  });
        });
    });
});