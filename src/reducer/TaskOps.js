import Type from '../actions/types.js'
import { addTaskInMap, updateTaskInMap, deleteTaskInMap, deleteTasklistInMap } from '../helper/TaskOps'

const initialState = {
    listToTaskMap: {}
}

const listToTaskReducer = (state = initialState, action) => {
    let {
        listToTaskMap
    } = state
    const {
        type,
        payload = {}
    } = action
    const {
        tasklistId,
        taskId,
        completed,
        title
    } = payload
    switch (type) {
        case Type.TASK_CREATE:
            addTaskInMap({ tasklistId, listToTaskMap })
            break

        case Type.TASK_UPDATE:
            updateTaskInMap({ listToTaskMap, taskId, tasklistId, title, completed })
            break

        case Type.TASK_DELETE:
            deleteTaskInMap({ listToTaskMap, tasklistId, taskId })
            break

        case Type.TASKLIST_DELETE:
            deleteTasklistInMap({ listToTaskMap, tasklistId })
            break

        default:
    }
    return {
        ...state,
        listToTaskMap: { ...listToTaskMap }
    }
}

export default listToTaskReducer