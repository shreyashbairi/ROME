import './App.css';
// import Layout from './Layout';
// import Welcome from './Welcome';
// import Login from './Login';
// import Signup from './Signup';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import TodoList from './components/jsx/Todo/TodoList';
import TodoForm from './components/jsx/Todo/TodoForm';

function App() {
  return (
    <div className="App">
      
      
      { /* Used to route thorugh pages add any adition pages here} */ }
        {/* <BrowserRouter>
        <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
       </Routes>
      </BrowserRouter> */}

      <TodoList />
    </div>
  );
}

export default App;
