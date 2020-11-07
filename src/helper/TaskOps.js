export const createTask = (title = '', completed) => {
    const taskId = Date.now().toString()
    return {
        taskId,
        title,
        completed
    }
}

export const addTaskInMap = ({ listToTaskMap, tasklistId }) => {
    let tasklist = listToTaskMap[tasklistId] || []
    tasklist.push(createTask())
    listToTaskMap[tasklistId] = tasklist
}

export const updateTaskInMap = ({ listToTaskMap, tasklistId, taskId, title, completed }) => {
    const tasklist = listToTaskMap[tasklistId] || []
    if (tasklist.length) {
        tasklist.forEach((task) => {
            if (task.taskId === taskId) {
                title && (task.title = title)
                task.completed = completed
            }
        })
    }
}

export const deleteTaskInMap = ({ listToTaskMap, tasklistId, taskId }) => {
    let tasklist = listToTaskMap[tasklistId] || []
    if (tasklist.length) {
        tasklist = tasklist.filter((task) => task.taskId !== taskId)
        listToTaskMap[tasklistId] = tasklist
    }
}

export const deleteTasklistInMap = ({ listToTaskMap, tasklistId }) => {
    delete listToTaskMap[tasklistId]
}