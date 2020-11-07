import { combineReducers } from 'redux'
import listOfTasklistContainer from './TaskListOps.js'
import listToTaskContainer from './TaskOps.js'

const reducer = combineReducers({
    listOfTasklistContainer,
    listToTaskContainer
})

export default reducer