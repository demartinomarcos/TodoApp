import axios from 'axios';
import { url, setHeaders } from '../../api';
import { toast } from 'react-toastify';

export const getTasksFolders = () => {
  return (dispatch) => {
    axios
      .get(`${url}/folders`, setHeaders())
      .then(tasksFolders => {
        dispatch({
          type: 'GET_TASKS_FOLDERS',
          tasksFolders
        });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      })
  }
}

export const addTaskFolder = (taskFolder) => {
  return (dispatch, getState) => {
    const author = getState().auth.name;
    const uid = getState().auth._id;

    axios
      .post(`${url}/folder`, { ...taskFolder, author, uid }, setHeaders())
      .then(taskFolder => {
        dispatch({
          type: 'ADD_TASK_FOLDER',
          taskFolder
        });
      })
      .catch(error => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
  }
}

export const updateTaskFolder = (updatedTaskFolder) => {
  return (dispatch) => {
    axios
      .put(`${url}/folder/update`, updatedTaskFolder, setHeaders())
      .then(taskFolder => {
        dispatch({
          type: 'UPDATE_TASK_FOLDER',
          taskFolder
        });
      })
      .catch(error => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
  }
}

export const deleteTaskFolder = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/folder/delete`, { headers: setHeaders().headers, data: { id: id } })
      .then(() => {
        dispatch({
          type: 'DELETE_TASK_FOLDER',
          id
        });
      })
      .catch(error => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
  }
}

export const openTaskFolder = (taskFolder) => {
  return (dispatch) => {
    axios
      .post(`${url}/tasks`, { folderId: taskFolder._id }, setHeaders())
      .then((tasks) => {
        dispatch({
          type: 'OPEN_TASK_FOLDER',
          tasks,
          taskFolder
        });
      })
      .catch(error => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
  }
}