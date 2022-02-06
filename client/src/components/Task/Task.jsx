import React from 'react';
import { Typography, Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Create, Delete, CheckCircle } from '@mui/icons-material';
import { deleteTask } from '../../store/actions/taskAction';
import { useDispatch } from 'react-redux';
import { checkTask } from '../../store/actions/taskAction';

const useStyle = makeStyles({
  task: {
    margin: '20px auto',
    padding: '20px',
    border: '2px solid #bdbdbd',
    borderRadius: '9px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  isComplete: {
    color: 'green'
  },
  checked: {
    textDecoration: 'line-through'
  }
})

const Task = ({ task, setTask }) => {
  const classes = useStyle();
  const dispatch = useDispatch()

  const handleUpdate = () => {
    setTask(task)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCheck = (id) => {
    dispatch(checkTask(id))
  }

  return (
    <>
      <div className={classes.task}>
        <div>
          {task.completed ? (
            <Typography variant='subtitle1' className={classes.checked}>
              {task.task}
            </Typography>
          ) : (
            <Typography variant='subtitle1'>
              {task.task}
            </Typography>
          )}
        </div>
        <div>
          <ButtonGroup size='small' aria-label='outlined primary'>
            <Button onClick={() => handleCheck(task._id)}>
              {task.completed ? (
                <CheckCircle color='success' className={classes.isComplete} />
              ) : (
                <CheckCircle color='action' />
              )}
            </Button>
            <Button onClick={() => handleUpdate()}>
              <Create color='primary' />
            </Button>
            <Button onClick={() => handleDelete(task._id)}>
              <Delete color='action' />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

export default Task;