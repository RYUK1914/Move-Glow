import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Moments from './pages/Moments'; // Import the new Moments page
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/moments" element={<Moments />} /> {/* Add Moments route */}
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;