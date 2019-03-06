const knex = require('knex')
const config = require('../../knexfile')
const actionsDB = knex(config.development)

module.exports ={
    get: () => {
        return actionsDB('actions')
    },

    getByID: (id) => {
        return actionsDB('actions')
        .leftJoin('actions', 'actions_id', '=', actions.action_id)
    },

    post: (action) => {
        return actionDB('actions')
               .insert(action)
               .then(ids => ({id: ids[0]}))
    },

    pull: (id, action) => {
        return actionsDB('actions')
               .where({id: id})
               .update(action)
    },

    delete: (id) => {
        return actionsDB('actions')
               .where({id: id})
               .truncate()
    }
} 