const { Model } = require('objection');

// define user model
class User extends Model {
    static get tableName() {
        return
        'users';
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id: { type: "integer" },
                username: { type: "string" },
                password: { type: "string" },
                createdate: { type: "string" },
                modifydate: { type: "string" },
                isdelete: { type: "boolean" }
            }
        };
    }

    static get relationMappings() {
        return {
            Task: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: 'users.id',
                    to: 'tasks.userid'
                }
            }
        }
    }
}

module.exports = User;
