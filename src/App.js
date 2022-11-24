import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import NewPassword from './NewPassword';
import ForgetPassword from './ForgetPassword';

function App() {


  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/newPassword' element={<NewPassword />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
