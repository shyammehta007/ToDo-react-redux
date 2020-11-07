import Type from '../actions/types.js'
import { createTasklist } from '../helper/TaskListOps'
const initialState = {
    listOfTasklistArray: []
}

const listOfTasklistReducer = (state = initialState, action) => {
    let {
        listOfTasklistArray
    } = state
    const {
        type,
        payload = {}
    } = action
    const {
        title,
        tasklistId
    } = payload
    let tasklist
    switch (type) {
        case Type.TASKLIST_CREATE:
            tasklist = createTasklist()
            listOfTasklistArray.push(tasklist)
            break

        case Type.TASKLIST_UPDATE:
            listOfTasklistArray.forEach((tasklist) => {
                if (tasklist.tasklistId === tasklistId) {
                    tasklist.title = title
                }
            })
            break

        case Type.TASKLIST_DELETE:
            listOfTasklistArray = listOfTasklistArray.reduce((result, current) => {
                if (current.tasklistId !== tasklistId) {
                    result.push(current)
                }
                return result
            }, [])
            break

        default:
    }
    return {
        ...state,
        listOfTasklistArray: [...listOfTasklistArray]
    }
}

export default listOfTasklistReducer