

import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import './styles.css';
import Home from './Home';
import Login from './components/Login';
import Header from './components/header/Header';
import SignUp from './components/SignUp';

function App() {

  return (
    
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
  
  );
}

export default App;




  