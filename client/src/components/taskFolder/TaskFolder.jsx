import React from 'react';
import { Typography, Button, ButtonGroup } from '@mui/material';
import { Create, FolderDeleteOutlined, FolderOpen } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { deleteTaskFolder, openTaskFolder } from '../../store/actions/taskFolderAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles({
  taskFolder: {
    margin: '20px auto',
    padding: '20px',
    border: '2px solid #bdbdbd',
    borderRadius: '9px',
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const TaskFolder = ({ taskFolder, setTaskFolder }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = () => {
    setTaskFolder(taskFolder)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  };

  const handleDelete = (id) => {
    dispatch(deleteTaskFolder(id));
  };

  const handleOpen = (taskFolder) => {
    dispatch(openTaskFolder(taskFolder));
    navigate("/tasks");
  }

  return (
    <>
      <div className={classes.taskFolder}>
        <div>
          <Typography variant='subtitle1'>
            {taskFolder.folderName}
          </Typography>
        </div>
        <div>
          <ButtonGroup size='small' aria-label='outlined primary'>
            <Button>
              <FolderOpen onClick={() => handleOpen(taskFolder)} />
            </Button>
            <Button onClick={() => handleUpdate()}>
              <Create color='primary' />
            </Button>
            <Button onClick={() => handleDelete(taskFolder._id)}>
              <FolderDeleteOutlined color='action' />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

export default TaskFolder;