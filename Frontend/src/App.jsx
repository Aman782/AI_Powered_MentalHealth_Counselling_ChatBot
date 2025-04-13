import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home'; 
import ChatWithAI from './components/ChatWithAI';  
import Signup from './components/Signup';
import Login from './components/Login';
import HowItWorks from './components/HowITWorks';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router> 
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={isLoggedIn?<ChatWithAI />:<Login />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path='#services' element={<HowItWorks />}/>
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
