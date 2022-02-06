import { toast } from 'react-toastify';

const initialState = {
  taskFolder: null,
  tasks: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_TASK_FOLDER':
      return {
        ...initialState,
        taskFolder: action.taskFolder,
        tasks: action.tasks.data
      };
    case 'ADD_TASK':
      toast.success('A task was created', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return {
        ...state,
        tasks: [...state.tasks, action.task.data]
      };
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.tasks.data
      };
    case 'REFRESH_TASKS':
      return {
        ...state,
        taskFolder: null,
        tasks: null
      };
    case 'DELETE_TASK':
      toast.success('A task was deleted', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      const filter = state.tasks.filter((task) =>
        task._id !== action.id
      );
      return {
        ...state,
        tasks: filter
      };
    case 'CHECK_TASK':
      toast.success('A task was updated', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      const tasksUpdatedCheck = (state.tasks.map((task) => task._id === action.task.data._id ? action.task.data : task));
      return {
        ...state,
        tasks: tasksUpdatedCheck
      };
    case 'UPDATE_TASK':
      console.log(action.task.data);
      toast.success('A task was updated', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      const tasksUpdated = (state.tasks.map((task) => task._id === action.task.data._id ? action.task.data : task));
      return {
        ...state,
        tasks: tasksUpdated
      };
    default:
      return state;
  }
};

export default taskReducer;