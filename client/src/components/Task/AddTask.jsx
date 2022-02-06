import React from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../../store/actions/taskAction';

const useStyles = makeStyles({
  form: {
    margin: '0 auto',
    padding: '30px',
    borderRadius: '9px',
    boxShadow: '0 0 12px -3px #000000',
    display: 'flex',
    justifyContent: 'space-between'
  },
  submit: {
    marginLeft: '20px'
  }
})

const AddTask = ({ task, setTask }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const taskFolder = useSelector((state) => state.task.taskFolder)

  const handleSubmit = e => {
    e.preventDefault();

    if (task._id) {
      dispatch(updateTask(task))
    } else {
      dispatch(addTask(task, taskFolder));
    }

    setTask({
      task: ''
    })
  }

  return (
    <>
      <form noValidate autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
        <TextField id='enter-task' variant='outlined' label='Enter new task'
          autoFocus fullWidth value={task.task} onChange={(e) => setTask({ ...task, task: e.target.value })} />
        <Button className={classes.submit} color='primary' variant='contained' type='submit'>
          <AddBoxOutlinedIcon />
        </Button>
      </form>
    </>
  );
}

export default AddTask;