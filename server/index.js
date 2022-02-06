const tasks = require('./routes/tasks');
const tasksFolders = require('./routes/tasksFolders');
const signUp = require('./routes/signUp');
const signIn = require('./routes/signIn');
const connection = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();

connection();

app.use(express.json());
app.use(cors());

app.use('/api', tasks);
app.use('/api', tasksFolders);
app.use('/api', signUp);
app.use('/api', signIn);

const port = process.env.port || 8024;
app.listen(port, () => console.log(`Application listening port ${port}`));