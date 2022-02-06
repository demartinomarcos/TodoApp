import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Task from './Task';
import { getTasks } from '../../store/actions/taskAction';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  task: {
    margin: '20px auto',
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 0 12px -3px #000000'
  },
  right: {
    '&&': {
      marginLeft: 'auto'
    }
  }
})

const ListTasks = ({ setTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const task = useSelector((state) => state.task)
  const tasks = task.tasks;
  const taskFolder = task.taskFolder;

  useEffect(() => {
    if (taskFolder) return dispatch(getTasks(taskFolder._id))
  }, [dispatch])

  const handleClose = () => {
    dispatch({ type: 'REFRESH_TASKS' })
    navigate('/');
  };

  return (
    <>
      <div className={classes.task}>
        {taskFolder &&
          <>
            <Grid container direction="row">
              <Grid item>
                <Typography variant='h5'>
                  {tasks && tasks.length > 0 ? `${taskFolder.folderName}` : `${taskFolder.folderName}`}
                </Typography>
              </Grid>
              <Grid item className={classes.right}>
                <Button onClick={() => handleClose()}>
                  <DriveFolderUploadIcon />
                </Button>
              </Grid>
            </Grid>
            {tasks && tasks.map((task) => {
              return (
                <Task task={task} key={task._id} setTask={setTask} />
              )
            })}
          </>}
      </div>
    </>
  );
}

export default ListTasks;