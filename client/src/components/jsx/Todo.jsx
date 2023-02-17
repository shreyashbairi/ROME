import '../css/Todo.css';

export function Todo() {

    const taskSubmit = () => {

    }

    const inputChange = () => {

    }

    return (
        <div id="container">
            <h1 id='header'>
            Your Tasks
            </h1>
            <form 
            onSubmit={taskSubmit}
            onChange={inputChange}
            >
                <input 
                    placeholder = "Enter new task"
                    className = "New_Task"
                />
            </form>
        </div>
    );
}

export default Todo