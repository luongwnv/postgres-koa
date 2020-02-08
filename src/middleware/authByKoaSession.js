const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const knex = require('../config/connection');
const options = {};

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
    return knex('users').where({ id }).first()
        .then((user) => { done(null, user); })
        .catch((err) => { done(err, null); });
    // return done(null, true);
});

passport.use(new LocalStrategy(options, (username, password, done) => {
    let error = null;
    knex('users').where({ username }).first()
        .then((user) => {
            if (!user) {
                error = 'Username is not existed.';
                return done(error, false);
            }
            if (bcrypt.compareSync(password, user.password)) {
                return done(error, user);
            } else {
                error = 'Password is not correct.';
                return done(error, false);
            }
        })
        .catch((err) => { return done(err); });
}));