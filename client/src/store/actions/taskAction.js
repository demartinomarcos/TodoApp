import axios from 'axios';
import { url, setHeaders } from '../../api';
import { toast } from 'react-toastify';

export const getTasks = (id) => {
  return (dispatch) => {
    axios
      .post(`${url}/tasks`, { folderId: id }, setHeaders())
      .then(tasks => {
        dispatch({
          type: 'GET_TASKS',
          tasks
        });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      })
  }
}

export const addTask = (task, taskFolder) => {
  return (dispatch, getState) => {
    const folderId = taskFolder._id;
    axios
      .post(`${url}/task`, { ...task, folderId }, setHeaders())
      .then(task => {
        dispatch({
          type: 'ADD_TASK',
          task
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

export const updateTask = (updatedTask) => {
  return (dispatch) => {
    axios
      .put(`${url}/task/update`, updatedTask, setHeaders())
      .then(task => {
        dispatch({
          type: 'UPDATE_TASK',
          task
        });
      })
      .catch(error => {
        console.log(error);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
  }
}

export const checkTask = (taskId) => {
  return (dispatch) => {
    axios
      .put(`${url}/task/check`, { id: taskId }, setHeaders())
      .then(task => {
        dispatch({
          type: 'CHECK_TASK',
          task
        })
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
  }
}

export const deleteTask = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/task/delete`, { headers: setHeaders().headers, data: { id: id } })
      .then(() => {
        dispatch({
          type: 'DELETE_TASK',
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