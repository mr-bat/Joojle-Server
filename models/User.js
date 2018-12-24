
const { Model } = require('objection');

class User extends Model {

    static get tableName() {
        return 'User';
    }

    fullName() {
        return this.username
    }

    static get jsonSchema () {
        return {
            type: 'object',
            required: ['username', 'email'],

            properties: {
                id: {type: 'integer'},
                username: {type: ['string', 'null']},
                email: {type: 'string'},
            }
        };
    }

}