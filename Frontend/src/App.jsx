import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home'; 
import ChatWithAI from './components/ChatWithAI';  
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router> 
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatWithAI />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
