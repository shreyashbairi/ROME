import './App.css';
import Layout from './components/jsx/Layout';
import Welcome from './components/jsx/Welcome';
import Login from './components/jsx/Login';
import Signup from './components/jsx/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import TodoList from './components/jsx/Todo/TodoList';
import TodoForm from './components/jsx/Todo/TodoForm';

function App() {
  return (
    <div className="App">
      
      
      { /* Used to route thorugh pages add any adition pages here} */ }
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
       </Routes>
      </BrowserRouter>

      <TodoList />
    </div>
  );
}

export default App;
