
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
        const PollItem = require('./PollItem');

        return {
            event: {
                relation: Model.BelongsToOneRelation,
                modelClass: Event,
                join: {
                    from: 'polls.eventId',
                    to: 'events.id'
                }
            },

            items: {
                relation: Model.HasManyRelation,
                modelClass: PollItem,
                join: {
                    from: 'polls.id',
                    to: 'pollItems.pollId'
                }
            }
        }
    }

}