import taskReducer from "./store/reducers/taskReducer";

const initialState = {
  taskFolder: null,
  tasks: null
};

const emptyFolderState = {
  taskFolder: {},
  tasks: []
}

const folderStateWithTasks = {
  taskFolder: {},
  tasks: [
    {
      folderId: 'xxxxxxxxxxxxxx',
      task: 'Task example',
      completed: false,
      _id: 'xxxxxxxxxxxxx'
    },
    {
      folderId: 'xxxxxxxxxxxxxx',
      task: 'Task example2',
      completed: false,
      _id: 'xxxxxxxxxxxyz'
    }
  ]
}

test('Should return the initial state', () => {
  expect(taskReducer(undefined, {})).toEqual(
    initialState
  )
})

test('Should handle open an empty task folder', () => {
  const action = {
    type: 'OPEN_TASK_FOLDER',
    taskFolder: {},
    tasks: {
      data: []
    }
  }
  expect(taskReducer(initialState, action)).toEqual(
    emptyFolderState
  )
})

test('Should handle open a non-empty task folder', () => {
  const action = {
    type: 'OPEN_TASK_FOLDER',
    taskFolder: {},
    tasks: {
      data: folderStateWithTasks.tasks
    }
  }
  expect(taskReducer(initialState, action)).toEqual(
    folderStateWithTasks
  )
})

test('should handle a task being added to an empty todo list', () => {
  const action = {
    type: 'ADD_TASK',
    task: {
      data: {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example',
        completed: false,
        _id: 'xxxxxxxxxxxxx'
      }
    }
  }
  expect(taskReducer(emptyFolderState, action)).toEqual(
    {
      ...emptyFolderState,
      tasks: [
        {
          folderId: 'xxxxxxxxxxxxxx',
          task: 'Task example',
          completed: false,
          _id: 'xxxxxxxxxxxxx'
        }
      ]
    }
  )
})

test('should handle a task being added to a non-empty todo list', () => {
  const action = {
    type: 'ADD_TASK',
    task: {
      data: {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example3',
        completed: false,
        _id: 'xxxxxxxxxxyz123'
      }
    }
  }
  expect(taskReducer(folderStateWithTasks, action)).toEqual(
    {
      ...folderStateWithTasks,
      tasks: [
        ...folderStateWithTasks.tasks,
        {
          folderId: 'xxxxxxxxxxxxxx',
          task: 'Task example3',
          completed: false,
          _id: 'xxxxxxxxxxyz123'
        }
      ]
    }
  )
})

test('should get all the tasks from an empty todo list', () => {
  const action = {
    type: 'GET_TASKS',
    tasks: {
      data: []
    }
  }
  expect(taskReducer(emptyFolderState, action)).toEqual(
    emptyFolderState
  )
})

test('should get all the tasks from a non-empty todo list', () => {
  const action = {
    type: 'GET_TASKS',
    tasks: {
      data: folderStateWithTasks.tasks
    }
  }
  expect(taskReducer(emptyFolderState, action)).toEqual(
    folderStateWithTasks
  )
})

test('Should handle refresh tasks', () => {
  const action = {
    type: 'REFRESH_TASKS'
  }
  expect(taskReducer(folderStateWithTasks, action)).toEqual(
    initialState
  )
})

test('Should handle a task being deleted from a todo list', () => {
  const action = {
    type: 'DELETE_TASK',
    id: 'xxxxxxxxxxxxx' 
  }
  expect(taskReducer(folderStateWithTasks, action)).toEqual({
    taskFolder: {},
    tasks: [
      {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example2',
        completed: false,
        _id: 'xxxxxxxxxxxyz'
      }
    ]
  })
})

test('Should handle a task being checked from a todo list', () => {
  const action = {
    type: 'CHECK_TASK',
    task: {
      data: {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example',
        completed: true,
        _id: 'xxxxxxxxxxxxx'
      }
    }
  }
  expect(taskReducer(folderStateWithTasks, action)).toEqual({
    taskFolder: {},
    tasks: [
      {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example',
        completed: true,
        _id: 'xxxxxxxxxxxxx'
      },
      {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example2',
        completed: false,
        _id: 'xxxxxxxxxxxyz'
      }
    ]
  })
})

test('Should handle a task being updated from a todo list', () => {
  const action = {
    type: 'UPDATE_TASK',
    task: {
      data: {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example3',
        completed: false,
        _id: 'xxxxxxxxxxxxx'
      }
    }
  }
  expect(taskReducer(folderStateWithTasks, action)).toEqual({
    taskFolder: {},
    tasks: [
      {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example3',
        completed: false,
        _id: 'xxxxxxxxxxxxx'
      },
      {
        folderId: 'xxxxxxxxxxxxxx',
        task: 'Task example2',
        completed: false,
        _id: 'xxxxxxxxxxxyz'
      }
    ]
  })
})