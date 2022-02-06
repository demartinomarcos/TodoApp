import { toast } from 'react-toastify';

const taskFolderReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK_FOLDER':
      toast.success('A task-folder was created', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return [...state, action.taskFolder.data];
    case 'GET_TASKS_FOLDERS':
      return action.tasksFolders.data;
    case 'UPDATE_TASK_FOLDER':
      toast.success('A task-folder was updated', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return state.map((taskFolder) =>
        taskFolder._id === action.taskFolder.data._id ?
          action.taskFolder.data : taskFolder
      );
    case 'DELETE_TASK_FOLDER':
      toast.success('A task-folder was deleted', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return state.filter((taskFolder) =>
        taskFolder._id !== action.id
      );
    default:
      return state;
  }
};

export default taskFolderReducer;