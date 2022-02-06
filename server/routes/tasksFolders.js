const TaskFolder = require('../models/taskFolder');
const Task = require('../models/task');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const task = require('../models/task');
const joi = require('joi');

router.post('/folder', auth, async (req, res) => {
  const schema = joi.object({
    folderName: joi.string().min(2).required(),
    author: joi.string().required(),
    uid: joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    if (error.details[0].message != '"folderName" is not allowed to be empty') {
      return res.status(400).send('Server error');
    }
    return res.status(400).send('The folder name cannot be empty');
  }

  try {
    const taskFolder = await new TaskFolder(req.body).save();
    res.send(taskFolder);
  } catch (error) {
    res.send(error);
  }
});

router.get('/folders', auth, async (req, res) => {
  try {
    const taskFolders = await TaskFolder.find();
    const filteredTaskFolders =
      taskFolders.filter(taskFolder => taskFolder.uid === req.user._id);
    res.send(filteredTaskFolders);
  } catch (error) {
    res.send(error);
  }
});

router.put('/folder/update', auth, async (req, res) => {
  console.log(req.body)

  const schema = joi.object({
    _id: joi.string().required(),
    folderName: joi.string().min(2).required(),
    uid: joi.string().required(),
    __v: joi.number().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    if (error.details[0].message != '"folderName" is not allowed to be empty') {
      return res.status(400).send('Server error');
    }
    return res.status(400).send('The folder name cannot be empty');
  }

  try {
    const taskFolder = await TaskFolder.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

    if (taskFolder.uid !== req.user._id) return res.status(401).send('Task folder update failed. Not authorized');

    res.send(taskFolder);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/folder/delete', auth, async (req, res) => {
  try {
    let taskFolder = await TaskFolder.findById(req.body.id);

    if (taskFolder.uid !== req.user._id) return res.status(401).send('Task folder update failed. Not authorized');

    taskFolder = await TaskFolder.findByIdAndDelete(req.body.id);
    await Task.deleteMany({ folderId: req.body.id });
    res.send(taskFolder);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;