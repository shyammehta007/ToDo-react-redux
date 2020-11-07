import Types from './types.js'

export const createTask = (details) => {
    return {
        type: Types.TASK_CREATE,
        payload: details
    }
}

export const deleteTask = (details) => {
    return {
        type: Types.TASK_DELETE,
        payload: details
    }
}

export const updateTask = (details) => {
    return {
        type: Types.TASK_UPDATE,
        payload: details
    }
}

export const readTasks = (details) => {
    return {
        type: Types.TASK_READ,
        payload: details
    }
}
