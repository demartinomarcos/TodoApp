import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import TaskFolder from './TaskFolder';
import { getTasksFolders } from '../../store/actions/taskFolderAction';

const useStyles = makeStyles({
  taskFolder: {
    margin: '20px auto',
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 0 12px -3px #000000'
  }
})

const ListTasksFolders = ({ setTaskFolder }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tasksFolders = useSelector((state) => state.tasksFolders)

  useEffect(() => {
    dispatch(getTasksFolders())
  }, [dispatch])

  return (
    <>
      <div className={classes.taskFolder}>
        <Typography variant='h5'>
          {tasksFolders.length > 0 ? 'Tasks Folders' : 'No Tasks Folders Yet'}
        </Typography>
        {tasksFolders && tasksFolders.map((taskFolder) => {
          return (
            <TaskFolder taskFolder={taskFolder} key={taskFolder._id} setTaskFolder={setTaskFolder} />
          )
        })}
      </div>
    </>
  );
}

export default ListTasksFolders;