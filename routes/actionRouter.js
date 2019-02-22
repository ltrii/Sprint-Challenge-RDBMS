const express = require('express');
const knex = require('knex')

const router = express.Router();
const dbconfig = require('../knexfile');
const db = knex(dbconfig.development)

router.get('/', (req, res) => {
  db('projects')
  .then(projects => {
      res.json(projects)
  })
  .catch(() => {
      res.status(500).json({error: 'Projects cannot be retrieved from the db.'})
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('projects')
    .where('projects.id', id)
    .then(project => {
      const thisProject = project[0]
      db('actions')
        .select(
          'actions.id',
          'actions.description',
          'actions.notes',
          'actions.is_complete',
          'actions.project_id'
        )
        .where('actions.project_id', id)
        .then(actions => {
          if (!thisProject) {
            res.status(404).json({ err: 'A project with that ID could not be found in the db.' })
          } else {
            res.json({
              id: thisProject.id,
              name: thisProject.name,
              description: thisProject.description,
              is_complete: thisProject.is_complete,
              actions: actions
            })
          }
        })
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: 'Info about this project could not be retrieved.' })
    })
})

router.post('/', (req, res) => {
    const project = req.body
    if(project.name && project.description && project.is_complete) {
        db('projects')
        .insert(project)
        .then(id => {
            res.status(201).json({ id: id[0]})
        })
        .catch(() => {
            res.status(500).json({error: 'Failed to insert the project into the db.'})
        })
    } else {
        res.status(400).json({error: 'Please provide a name, description and if project is completed or not.'})
    }
})



module.exports = router