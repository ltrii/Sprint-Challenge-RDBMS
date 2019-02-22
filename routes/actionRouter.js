const express = require('express');
const router = express.Router();
const db = require('../knexfile');

router.get('/api/actions', async (req, res) => {
    try {
      const actions = await db('actions'); 
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get('/api/actions/:id', async (req, res) => {
    try {
      const action = await db('actions')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(action);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  const errors = {
    '19': 'Another record with that value exists',
  };
  
  router.post('/api/actions', async (req, res) => {
    if(!req.body.name) {
      res.status(400).json({ errormsg: 'Please enter a name' });
      return;
    }
    try {
      const [id] = await db('actions').insert(req.body);
  
      const action = await db('actions')
        .where({ id })
        .first();
  
      res.status(201).json(action);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });
  
  router.put('/api/actions/:id', async (req, res) => {
    if(!req.body.name) {
      res.status(400).json({ errormsg: 'Please enter a name' });
      return;
    }
    try {
      const count = await db('actions')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const action = await db('actions')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });
  
  
  router.delete('/api/actions/:id', async (req, res) => {
    try {
      const count = await db('actions')
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