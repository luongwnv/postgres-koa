const { Model } = require('objection');

// define task model
class Task extends Model {
    static get tableName() {
        return 'tasks';
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id: { type: "integer" },
                userid: { type: "integer" },
                taskname: { type: "string" },
                description: { type: "string" },
                createdate: { type: "string" },
                modifydate: { type: "string" },
                iscomplete: { type: "boolean" },
                isdelete: { type: "boolean" }
            }
        };
    }

    static get relationMappings() {
        return {
            idea: {
                relation: Model.BelongsToOneRelation,
                modelClass: Idea,
                join: {
                    from: 'tasks.userid',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Task;
