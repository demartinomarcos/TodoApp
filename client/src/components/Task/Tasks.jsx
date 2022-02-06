import React, { useState } from 'react';
import AddTask from './AddTask';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ListTasks from './ListTask';

const Tasks = () => {
  const auth = useSelector(state => state.auth);
  const [task, setTask] = useState({
    task: ''
  });

  if (!auth._id) return <Navigate to='/signin' />

  return (
    <>
      <AddTask task={task} setTask={setTask} />
      <ListTasks setTask={setTask} />
    </>
  );
}

export default Tasks;