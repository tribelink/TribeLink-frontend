// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ServicePage from './components/ServicePage';
import Cart from './components/Cart';
import { CartProvider } from './contexts/cartContext';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './components/ServicePage';


const App = () => {
  return (
    <Router>
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:categoryId" element={<ServicePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />}/>
        
            
          </Routes>
        </main>
        <Footer />
      </div>
      </CartProvider>
    </Router>
  );
};

export default App;
