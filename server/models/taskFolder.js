const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskFolderSchema = new Schema({
  folderName: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('taskFolder', taskFolderSchema)