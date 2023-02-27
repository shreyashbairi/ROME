import './App.css';


import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import TodoList from './components/jsx/Todo/TodoList';
import ResetPassword from './components/jsx/ResetPassword';
import ForgotPassword from './components/jsx/ForgotPassword';
import Layout from './components/jsx/Layout';
import Welcome from './components/jsx/Welcome';
import Login from './components/jsx/Login';
import Signup from './components/jsx/Signup';
import Calendar from './components/jsx/Calendar';
import CalendarTest from './components/jsx/CalendarTest';
import Profile from './components/jsx/Profile';
import EditProfile from './components/jsx/EditProfile';
import MainPage from './components/jsx/MainPage';
import DefaultLayout from './components/jsx/DefaultLayout';

//TODO delete below
//import Todo from "./components/jsx/Todo/TodoTest"



function App() {
  return (
    <div className="App">

      
      { /* Used to route thorugh pages add any adition pages here} */ }
<<<<<<< HEAD
       <BrowserRouter>
=======
      <BrowserRouter>
>>>>>>> c5e939cbebd3d407fe9efdd453dc2e0f30339b57
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/editprofile" element={<EditProfile />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/calendar" element={<CalendarTest />} />
            <Route path="/todo" element={<TodoList />} />
          </Route>



        </Routes>
      </BrowserRouter>

<<<<<<< HEAD
      {/* <Todo /> */}

      {/* <MainPage /> */}
=======
>>>>>>> c5e939cbebd3d407fe9efdd453dc2e0f30339b57
      {/* <TodoList /> */}
    </div>
  );
}

export default App;
