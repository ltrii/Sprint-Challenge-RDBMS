const knex = require('knex')
const config = require('../../knexfile')
const projectsDB = knex(config.development)

module.exports ={
    get: () => {
        return projectsDB('projects')
    },

    getByID: (id) => {
        return projectsDB('projects')
        .leftJoin('actions', 'projects_id', '=', actions.project_id)
    },

    post: (project) => {
        return projectDB('projects')
               .insert(project)
               .then(ids => ({id: ids[0]}))
    },

    pull: (id, project) => {
        return projectsDB('projects')
               .where({id: id})
               .update(project)
    },

    delete: (id) => {
        return projectsDB('projects')
               .where({id: id})
               .truncate()
    }
} 