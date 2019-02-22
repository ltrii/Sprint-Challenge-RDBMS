const express = require('express');
const router = express.Router();
const db = require('../knexfile');

router.get('/api/projects', async (req, res) => {
    try {
      const projects = await db('projects'); 
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get('/api/projects/:id', async (req, res) => {
    try {
      const project = await db('projects')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  const errors = {
    '19': 'Another record with that value exists',
  };
  
  router.post('/api/projects', async (req, res) => {
    if(!req.body.name) {
      res.status(400).json({ errormsg: 'Please enter a name' });
      return;
    }
    try {
      const [id] = await db('projects').insert(req.body);
  
      const project = await db('projects')
        .where({ id })
        .first();
  
      res.status(201).json(project);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });
  
  router.put('/api/projects/:id', async (req, res) => {
    if(!req.body.name) {
      res.status(400).json({ errormsg: 'Please enter a name' });
      return;
    }
    try {
      const count = await db('projects')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const project = await db('projects')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });
  
  
  router.delete('/api/projects/:id', async (req, res) => {
    try {
      const count = await db('projects')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });
  
module.exports = router;