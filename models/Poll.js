
const { Model } = require('objection');

class Poll extends Model {

    static get tableName() {
        return 'Poll';
    }

    static get jsonSchema () {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                status: {type: 'string'},
                description: {type: 'string'},
            }
        };
    }

    static get relationMappings() {
        const Event = require('./Event');

        return {
            event: {
                relation: Model.BelongsToOneRelation,
                modelClass: Event,
                join: {
                    from: 'polls.event',
                    to: 'events.id'
                }
            }
        }
    }

}