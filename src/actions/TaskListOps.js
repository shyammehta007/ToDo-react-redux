import Types from './types.js'

export const createTasklist = (details) => {
    return {
        type: Types.TASKLIST_CREATE,
        payload: details
    }
}

export const updateTasklist = (details) => {
    return {
        type: Types.TASKLIST_UPDATE,
        payload: details
    }
}

export const deleteTasklist = (details) => {
    return {
        type: Types.TASKLIST_DELETE,
        payload: details
    }
}

export const readTasklist = (details) => {
    return {
        type: Types.TASKLIST_READ,
        payload: details
    }
}
