import './Todo.css';

export function Todo() {
    return (
        <div id="container">
            <h1 id='header'>
            Your Tasks
            </h1>
            <ul id = 'task_box'>
                <li className='task'>
                    Example Task
                    <div className='Description'>
                        Notes
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Todo