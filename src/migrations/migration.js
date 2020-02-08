exports.up = function(knex) {
    return knex.schema
        // script create users table
        .createTable("users", table => {
            table.increments("id").primary();
            table.text("username").notNullable();
            table.text("password").notNullable();
            table.timestamp("createdate").notNullable();
            table.timestamp("modifydate").notNullable();
            table.boolean("isdelete");
        })
        // script create tasks table
        .createTable("tasks", table => {
            table.increments("id").primary();
            table.integer("userid").notNullable();
            table.text("taskname").notNullable();
            table.text("description").notNullable();
            table.timestamp("createdate").notNullable();
            table.timestamp("modifydate").notNullable();
            table.boolean("iscomplete");
            table.boolean("isdelete");
            table.foreign('userid').references('id').inTable('users').onDelete('CASCADE').onUpdate('RESTRICT')
        });;
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('tasks')
};