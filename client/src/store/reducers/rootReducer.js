import taskFolderReducer from './taskFolderReducer';
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  tasksFolders: taskFolderReducer,
  auth: authReducer,
  task: taskReducer
});

export default rootReducer;