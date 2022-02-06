import React, { useState } from 'react';
import AddTaskFolder from './AddTaskFolder';
import ListTasksFolders from './ListTasksFolders';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const TaskFolder = () => {
  const auth = useSelector(state => state.auth);
  const [taskFolder, setTaskFolder] = useState({
    folderName: ''
  });
  const dispatch = useDispatch();

  if (!auth._id) return <Navigate to='/signin' />

  return (
    <>
      <AddTaskFolder taskFolder={taskFolder} setTaskFolder={setTaskFolder} />
      <ListTasksFolders setTaskFolder={setTaskFolder} />
    </>
  );
}

export default TaskFolder;