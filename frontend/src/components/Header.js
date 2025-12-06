import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Move&Glow</h1>
      </div>
      
      {/* Hamburger button - ALWAYS VISIBLE ON MOBILE */}
      <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
        {isMenuOpen ? '✕' : '☰'}
      </button>
      
      {/* Navigation */}
      <nav className={isMenuOpen ? 'nav-open' : ''}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        <Link to="/moments" onClick={() => setIsMenuOpen(false)}>Moments</Link>
      </nav>
      
      {/* Cart Icon */}
      <div className="cart-icon">
        <Link to="/cart">
          <span className="cart-logo">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;