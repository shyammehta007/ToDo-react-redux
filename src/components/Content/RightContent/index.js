import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createTask, deleteTask, updateTask } from '../../../actions/TaskOps'
import './style.css'
import { debounce } from '../../../utills/debounce'


const TaskElementTemplate = ({ task }) => {
    const { taskId, title, completed } = task
    const [checked, setChecked] = useState(completed)
    return (
        <div className='task-element' id={taskId}>
            <input type='checkbox' checked={checked} onChange={() => setChecked(!checked)} className='task-completed' />
            <input type='text' defaultValue={title} autoFocus className='task-title' />
            <div className='task-delete' />
        </div>
    )
}

const renderTaskOfTasklist = (tasklist) => {
    return tasklist.map((task) => {
        return <TaskElementTemplate task={task} key={task.taskId} />
    })
}

const onChangeHandler = debounce(({ target, dispatchUpdateTask, tasklistId }) => {
    const {
        className: changetype,
        parentNode: {
            id: taskId
        }
    } = target

    const TASKOPERATION = {
        'task-completed': () => {
            const completed = target.checked
            dispatchUpdateTask({ tasklistId, completed, taskId })
        },
        'task-title': () => {
            const title = target.value
            dispatchUpdateTask({ tasklistId, title, taskId })
        }
    }

    TASKOPERATION[changetype]()
}, 1000)

const onClickHandler = ({ target, dispatchDeleteTask, tasklistId }) => {
    const {
        className,
        parentNode: {
            id: taskId
        }
    } = target
    if (className === 'task-delete') {
        dispatchDeleteTask({ tasklistId, taskId })
    }
}

class RightContent extends React.Component {

    addTaskClick = () => {
        const { tasklistId, dispatchCreateTask } = this.props
        dispatchCreateTask({ tasklistId })
    }

    taskElementClickHandler = ({ target }) => {
        const { dispatchDeleteTask, tasklistId } = this.props
        onClickHandler({ target, dispatchDeleteTask, tasklistId })
    }

    taskElementChangeHandler = ({ target }) => {
        const { dispatchUpdateTask, tasklistId } = this.props
        onChangeHandler({ target, dispatchUpdateTask, tasklistId })
    }

    render() {
        const {
            tasklistId,
            listOfTasklistArray,
            listToTaskMap
        } = this.props

        const tasklistHeading = listOfTasklistArray.find(tasklist => tasklist.tasklistId === tasklistId) || {}
        const { title: tasklistTitle } = tasklistHeading

        const tasklist = listToTaskMap[tasklistId] || []
        return (
            <div className='right-content'>
                <div className='preview-heading'>
                    <div title={tasklistTitle} className='preview-title'>{tasklistTitle}</div>
                    <button className='add-task-button' onClick={this.addTaskClick}>Add</button>
                </div>
                <div
                    onClick={this.taskElementClickHandler}
                    onChange={this.taskElementChangeHandler}
                >
                    {renderTaskOfTasklist(tasklist)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        listOfTasklistContainer: {
            listOfTasklistArray = []
        },
        listToTaskContainer: {
            listToTaskMap = []
        }
    } = state
    return {
        listOfTasklistArray,
        listToTaskMap
    }
}

const mapStateToDispatch = dispatch => {
    return {
        dispatchCreateTask: details => dispatch(createTask(details)),
        dispatchUpdateTask: details => dispatch(updateTask(details)),
        dispatchDeleteTask: details => dispatch(deleteTask(details))
    }
}
export default connect(mapStateToProps, mapStateToDispatch)(RightContent);