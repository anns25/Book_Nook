import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import About from './pages/About';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthProvider';
import View from './pages/View';
import { books } from './data/books';
import Cart from './pages/Cart';




function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <ToastContainer />
      {user ? <><Navbar />
        <Routes >
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/book/:id' element={<View books  = {books}/>}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes><Footer /></> : <Login />}


    </BrowserRouter>
  );
}

export default App;
