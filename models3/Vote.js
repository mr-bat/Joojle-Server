
const { Model } = require('objection');

class Vote extends Model {

    static get tableName() {
        return 'Vote';
    }

    static get jsonSchema () {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                verdict: {type: 'string'},
            }
        };
    }

    static get relationMappings() {
        const User = require('./User');

        return {
            voter: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'votes.voterId',
                    to: 'users.id'
                }
            }
        }
    }

}