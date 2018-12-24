
const { Model } = require('objection');

class PollItem extends Model {

    static get tableName() {
        return 'PollItem';
    }

    static get jsonSchema () {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                startDate: {type: 'string'},
                endDate: {type: 'string'},
                acceptCount: {type: 'integer'},
                declineCount: {type: 'integer'}

            }
        };
    }

    static get relationMappings() {
        const Vote = require('./Vote');

        return {
            votes: {
                relation: Model.HasManyRelation,
                modelClass: Vote,
                join: {
                    from: 'votes.poll',
                    to: 'pollitems.id'
                }
            }
        }
    }

}