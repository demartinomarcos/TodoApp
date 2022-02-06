import React from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { useDispatch } from 'react-redux';
import { addTaskFolder, updateTaskFolder } from '../../store/actions/taskFolderAction';

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

const AddTaskFolder = ({ taskFolder, setTaskFolder }) => {
  const classes = useStyles();
  const dispatch = useDispatch()


  const handleSubmit = e => {
    e.preventDefault();

    if (taskFolder._id) {
      dispatch(updateTaskFolder(taskFolder))
    } else {
      dispatch(addTaskFolder(taskFolder));
    }

    setTaskFolder({
      folderName: ''
    })
  }

  return (
    <>
      <form noValidate autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
        <TextField id='enter-task-folder' variant='outlined' label='Enter new task-folder'
          autoFocus fullWidth value={taskFolder.folderName} onChange={(e) => setTaskFolder({ ...taskFolder, folderName: e.target.value })} />
        <Button className={classes.submit} color='primary' variant='contained' type='submit'>
          <CreateNewFolderOutlinedIcon />
        </Button>
      </form>
    </>
  );
}

export default AddTaskFolder;