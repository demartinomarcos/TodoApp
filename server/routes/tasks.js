const Task = require('../models/task');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const task = require('../models/task');
const joi = require('joi');

router.post('/task', auth, async (req, res) => {
  const schema = joi.object({
    task: joi.string().min(2).required(),
    folderId: joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message)
    if (error.details[0].message != '"task" is not allowed to be empty') {
      return res.status(400).send('Server error');
    }
    return res.status(400).send('The task name cannot be empty');
  }

  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.post('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ folderId: req.body.folderId });
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.put('/task/update', auth, async (req, res) => {
  console.log(req.body);
  const schema = joi.object({
    task: joi.string().min(2).required(),
    _id: joi.string().required(),
    folderId: joi.string().required(),
    completed: joi.boolean().required(),
    __v: joi.number().required()
  });

  const { error } = schema.validate(req.body);

  console.log(error)

  if (error) {
    console.log(error.details[0].message)
    if (error.details[0].message != '"task" is not allowed to be empty') {
      return res.status(400).send('Server error');
    }
    return res.status(400).send('The task name cannot be empty');
  }

  try {
    const task = await Task.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
    console.log(task);
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.put('/task/check', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.body.id);
    const taskUpdated = await Task.findOneAndUpdate({ _id: req.body.id },
      {
        completed: !task.completed
      }, { new: true });
    res.send(taskUpdated);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/task/delete', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.body.id);
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;