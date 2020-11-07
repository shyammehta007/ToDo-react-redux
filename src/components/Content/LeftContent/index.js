import { debounce } from '../../../utills/debounce'
import React from 'react'
import { connect } from 'react-redux';
import { createTasklist, deleteTasklist, updateTasklist } from '../../../actions/TaskListOps'
import './style.css'


const ListElementTemplate = (props) => {
    const { data: {
        tasklistId,
        title
    } } = props
    return (
        <div className='tasklistelement' id={tasklistId}>
            <input autoFocus defaultValue={title} className='tasklist-title' />
            <div className='tasklist-delete' />
        </div>
    )
}

const renderListOfTasklist = (tasklistArray) => {
    return tasklistArray.map((tasklist) => {
        return <ListElementTemplate data={tasklist} key={tasklist.tasklistId} />
    })
}

const onChangeHandler = debounce(({ target, dispatchUpdateTasklist }) => {
    const {
        value,
        parentNode: {
            id
        }
    } = target
    dispatchUpdateTasklist({ tasklistId: id, title: value })
}, 1000)


const onClickHandler = ({ target, openPreview, dispatchDeleteTasklist, closePreview }) => {
    const {
        className,
        parentNode: {
            id
        }
    } = target
    if (className === 'tasklist-title') {
        openPreview(id)
    }
    if (className === 'tasklist-delete') {
        dispatchDeleteTasklist({ tasklistId: id })
        closePreview(id)
    }
}

class LeftContent extends React.Component {
    taskListElementOnChange = ({ target }) => {
        const { dispatchUpdateTasklist } = this.props
        onChangeHandler({ target, dispatchUpdateTasklist })
    }

    taskListElementOnClick = ({ target }) => {
        const { openPreview, closePreview, dispatchDeleteTasklist } = this.props
        onClickHandler({ target, openPreview, dispatchDeleteTasklist, closePreview })
    }
    render() {
        const {
            dispatchCreateTasklist,
            listOfTasklistArray,
        } = this.props

        return (
            <div className='left-content'>
                <div className='list-container-heading'>
                    <div> List Of TaskList</div>
                    <button className='addListButton' onClick={dispatchCreateTasklist}>Add</button>
                </div>
                <div
                    onChange={this.taskListElementOnChange}
                    onClick={this.taskListElementOnClick}
                >
                    {renderListOfTasklist(listOfTasklistArray)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        listOfTasklistContainer: {
            listOfTasklistArray = []
        }
    } = state
    return {
        listOfTasklistArray
    }
}

const mapStateToDispatch = dispatch => {
    return {
        dispatchCreateTasklist: details => dispatch(createTasklist(details)),
        dispatchUpdateTasklist: details => dispatch(updateTasklist(details)),
        dispatchDeleteTasklist: details => dispatch(deleteTasklist(details))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(LeftContent);