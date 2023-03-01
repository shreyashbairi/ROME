import TodoList from "./Todo/TodoList"
import "../css/TeamHome.css"
function TeamHome() {
    return (
        <div>
            <div className="todo-container">
                {/* make a different component than TodoList bc this one has some additional functionality
                other code can still be used for reference.  It's just easier to make new
                for now we just need the spaces for it */}
            </div>
            <div className="in-progress-container">

            </div>
            <div className="complete-list">
                {/* Note: things here need to be deletable so they don't pile up too much */}
            </div>
            <div className="announcements">

            </div>
            <div className="group-chat">

            </div>
        </div>
        //sidebar
        //group todo
        //in progress
        //completed todos
        //team chat area
    )
}

export default TeamHome