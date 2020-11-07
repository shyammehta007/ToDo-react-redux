export const createTasklist = (title = '') => {
    const tasklistId = Date.now().toString()
    return { tasklistId, title }
}
