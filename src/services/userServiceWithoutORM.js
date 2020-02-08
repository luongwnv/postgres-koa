import { Pool } from 'pg';

const bcrypt = require('bcryptjs');

const jwt = require("../middleware/jwt");

// function register using native query 
async function register(ctx) {
    if (!ctx.request.body.username || !ctx.request.body.password) {
        ctx.status = 400;
        ctx.body = { 'message': 'Username or password is missing.' };
        return;
    }
    const hashPassword = bcrypt.hashSync(user.password);
    const createQuery = `INSERT INTO users(
        username, 
        password, 
        createdate,
        modifydate,
        isdelete)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
    const values = [
        ctx.request.body.username,
        hashPassword,
        new Date().toISOString(),
        new Date().toISOString(),
        false
    ];

    try {
        const { rows } = await db.query(createQuery, values);
        let token = jwt.createToken({
            username: user[0].id
        });
        ctx.status = 200;
        ctx.body = token;
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            ctx.status = 400;
            ctx.body = { 'message': 'User with that username already exist.' };
            return;
        }
        ctx.status = 400;
        ctx.body = error
        return;
    }
}

// function login using native query 
async function login(ctx) {
    if (!ctx.request.body.username || !ctx.request.body.password) {
        ctx.status = 400;
        ctx.body = { 'message': 'Username or password is missing.' };
        return;
    }
    const text = 'SELECT * FROM users WHERE username = $1';
    try {
        const { rows } = await db.query(text, [ctx.request.body.username]);
        if (!rows[0]) {
            ctx.status = 400;
            ctx.body = { 'message': 'Username is not existed' };
            return;
        }
        if (!bcrypt.compareSync(rows[0].password, ctx.request.body.username)) {
            ctx.status = 400;
            ctx.body = { 'message': 'Password is incorrect' };
            return;
        }
        let token = jwt.createToken({
            username: user[0].id
        });
        ctx.status = 200;
        ctx.body = token;
        return;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error
        return;
    }
}