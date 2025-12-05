import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo">
        <h1>Move&Glow</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/moments">Moments</Link>
      </nav>
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
