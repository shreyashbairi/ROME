import './App.css';


import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
//components
import Login from './components/jsx/Login';
import TodoList from './components/jsx/Todo/TodoList';
import ResetPassword from './components/jsx/ResetPassword';
import ForgotPassword from './components/jsx/ForgotPassword';
import Layout from './components/jsx/Layout';
import Welcome from './components/jsx/Welcome';
import Signup from './components/jsx/Signup';
import Calendar from './components/jsx/Calendar/Calendar';
import CalendarTest from './components/jsx/Calendar/CalendarTest';
import CalendarFunc from './components/jsx/Calendar/CalendarFunc';
import Profile from './components/jsx/Profile';
import EditProfile from './components/jsx/EditProfile';
import MainPage from './components/jsx/MainPage';
import DefaultLayout from './components/jsx/DefaultLayout';
import Messenger from './components/jsx/Mesenger';
import axios from 'axios';
import AddEvent from './components/jsx/Calendar/AddEvent';
import { useState, useContext } from 'react';
import TeamHome from './components/jsx/TeamHome';
import { UserContextProvider } from './components/jsx/UserContext';
import { Navigate} from 'react-router-dom';
import { UserContext } from './components/jsx/UserContext';
// import { TeamContext } from './components/jsx/TeamContextProvider';
import { Redirect } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
//TODO delete below
//import Todo from "./components/jsx/Todo/TodoTest"

// function PrivateRoute({ element, ...rest }) {
//   const loggedInUser = localStorage.getItem('user');

//   return (
//     <Route
//       {...rest}
//       element={loggedInUser ? element : <Navigate to="/login" replace />}
//     />
//   );
// }

function AuthRoutes() {
  

  const { user } = useContext(UserContext);
  let loggedInUser = null;
  if(user !== null){
    loggedInUser = user.userUserName; 
  }
  console.log("logged in user is:" + loggedInUser);
  
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login', { replace: true });
  //   }
  // }, [loggedInUser, navigate]);
  // if (!isLoggedIn) {
  //   navigate('/login');
  // }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/profile" element={user !== null ? <Profile /> : <Navigate to="/login" />}/>
          <Route path='/messenger' element={user !== null  ? <Messenger /> : <Navigate to="/login" />}/>
          <Route path="/main" element={user !== null ? <MainPage /> : <Navigate to="/login" />}/>
          <Route path="/editprofile" element={user !== null  ? <EditProfile /> : <Navigate to="/login" />}/>
          <Route path="/calendar" element={user !== null  ? <CalendarFunc /> : <Navigate to="/login" />}/>
          <Route path="/todo" element={user !== null  ? <TodoList /> : <Navigate to="/login" />}/>
          <Route path="/add" element={user !== null  ? <AddEvent /> : <Navigate to="/login" />}/>
          <Route path='/team/:team' element={user !== null  ? <TeamHome /> : <Navigate to="/login" />}/>
          <Route path='/team/:team' element={user !== null  ? <TeamHome /> : <Navigate to="/login" />}/>
          
        </Route>
      : null;
    </Routes>
  );
}

function App() {
  const [redirect, setRedirect] = useState(false);
  const [show,setShow] = useState(false);

  // Check if user is logged in <Route path="/calendar" element={<CalendarFunc />} />   <Route path="/editprofile" element={<EditProfile />} />  <Route path="/main" element={<MainPage />} />

  return (
    <div className="App">
    <UserContextProvider>
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </UserContextProvider>
  </div>
  );
}

export default App;
