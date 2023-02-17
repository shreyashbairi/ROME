import './App.css';
import Todo from './components/Todo';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Todo /> */}
      
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
    </div>
  );
}

export default App;
