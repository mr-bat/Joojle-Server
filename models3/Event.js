
const { Model } = require('objection');

class Event extends Model {

    static get tableName() {
        return 'Event';
    }

    static get jsonSchema () {
        return {
            type: 'object',
            required: ['title'],

            properties: {
                id: {type: 'integer'},
                title: {type: 'string'},
                description: {type: 'string'},
            }
        };
    }

    static get relationMappings() {
        const User = require('./User');

        return {

            participants: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'events.id',
                    through: {
                        from: 'events_users.eventId',
                        to: 'events_users.userId'
                    },
                    to: 'users.id'
                }
            }
        }
    }

}