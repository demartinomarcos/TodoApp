import taskFolderReducer from "./store/reducers/taskFolderReducer";

const emptyState = [];

const nonEmptyState = [
  {
    folderName: 'Task folder example',
    uid: 'xxxxxxx',
    _id: 'xxxxxxxxxxxxxx'
  },
  {
    folderName: 'Task folder example2',
    uid: 'yyyyyyy',
    _id: 'yyyyyyyyyyyyyy'
  }
];

test('Should handle a task folder being added to a todo list without folders', () => {
  const action = {
    type: 'ADD_TASK_FOLDER',
    taskFolder: {
      data: {
        folderName: 'Task folder example',
        uid: 'xxxxxxx',
        _id: 'xxxxxxxxxxxxxx'
      }
    }
  }
  expect(taskFolderReducer(emptyState, action)).toEqual([
    {
      folderName: 'Task folder example',
      uid: 'xxxxxxx',
      _id: 'xxxxxxxxxxxxxx'
    }
  ])
})

test('Should handle a task folder being added to a todo list with folders', () => {
  const action = {
    type: 'ADD_TASK_FOLDER',
    taskFolder: {
      data: {
        folderName: 'Task folder example3',
        uid: 'zzzzzzzz',
        _id: 'zzzzzzzzzzzzzzz'
      }
    }
  }
  expect(taskFolderReducer(nonEmptyState, action)).toEqual([
    ...nonEmptyState,
    {
      folderName: 'Task folder example3',
      uid: 'zzzzzzzz',
      _id: 'zzzzzzzzzzzzzzz'
    }
  ])
})

test('Should get all task folders', () => {
  const action = {
    type: 'GET_TASKS_FOLDERS',
    tasksFolders: {
      data: nonEmptyState
    }
  }
  expect(taskFolderReducer(emptyState, action)).toEqual(
    nonEmptyState
  )
})

test('Should handle a task folder being updated', () => {
  const action = {
    type: 'UPDATE_TASK_FOLDER',
    taskFolder: {
      data: {
        folderName: 'Task folder updated example',
        uid: 'yyyyyyy',
        _id: 'yyyyyyyyyyyyyy'
      }
    }
  }
  expect(taskFolderReducer(nonEmptyState, action)).toEqual([
    {
      folderName: 'Task folder example',
      uid: 'xxxxxxx',
      _id: 'xxxxxxxxxxxxxx'
    },
    {
      folderName: 'Task folder updated example',
      uid: 'yyyyyyy',
      _id: 'yyyyyyyyyyyyyy'
    }
  ])
})

test('Should handle a task folder being deleted', () => {
  const action = {
    type: 'DELETE_TASK_FOLDER',
    id: 'yyyyyyyyyyyyyy'
  }
  expect(taskFolderReducer(nonEmptyState, action)).toEqual([
    {
      folderName: 'Task folder example',
      uid: 'xxxxxxx',
      _id: 'xxxxxxxxxxxxxx'
    }
  ])
})