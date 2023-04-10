function TodoList({tasks, titles}) {
    return tasks.map(({title})=>title)
}

export default TodoList