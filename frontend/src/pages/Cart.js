import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeItem } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    location: ''
  });

  // Utility to parse price string with commas to float number
  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'string') {
      return parseFloat(priceStr.replace(/,/g, ''));
    }
    return parseFloat(priceStr);
  };

  // Utility to format price without trailing .00
  const formatPrice = (price) => {
    return price % 1 === 0 ? price.toString() : price.toFixed(2);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parsePrice(item.product.price) * item.quantity,
    0
  );

  const handleRemove = (productId) => {
    removeItem(productId);
  };

  const handlePayWithCard = () => {
    setShowCardModal(true);
  };

  const handlePayWithCash = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCardModal(false);
    setFormData({
      name: '',
      lastName: '',
      phone: '',
      location: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare order data
    const orderData = {
      customer: {
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.location,
      },
      items: cartItems.map(({ product, quantity }) => ({
        product: {
          name: product.name,
          price: parsePrice(product.price),
        },
        quantity,
        subtotal: parsePrice(product.price) * quantity,
      })),
      totalPrice,
      paymentMethod: 'cash', // Since this is the cash payment modal
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order placed successfully! You will receive a confirmation email.');
        handleCloseModal();
        // Optionally clear the cart after successful order
        // clearCart(); // If you have a clearCart function in CartContext
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please check your connection and try again.');
    }
  };

  const handleCloseCardModal = () => {
    setShowCardModal(false);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          
          {/* MOBILE VIEW - Card Layout */}
          <div className="mobile-cart-view">
            {cartItems.map(({ product, quantity }) => {
              const subtotal = parsePrice(product.price) * quantity;
              return (
                <div key={product.id} className="mobile-cart-item">
                  <div className="mobile-cart-item-row">
                    <span className="mobile-cart-label">Product:</span>
                    <span className="mobile-cart-value">{product.name}</span>
                  </div>
                  <div className="mobile-cart-item-row">
                    <span className="mobile-cart-label">Quantity:</span>
                    <span className="mobile-cart-value">{quantity}</span>
                  </div>
                  <div className="mobile-cart-item-row">
                    <span className="mobile-cart-label">Price:</span>
                    <span className="mobile-cart-value">{product.price} TND</span>
                  </div>
                  <div className="mobile-cart-item-row">
                    <span className="mobile-cart-label">Subtotal:</span>
                    <span className="mobile-cart-value">{formatPrice(subtotal)} TND</span>
                  </div>
                  <div className="mobile-cart-item-row">
                    <span className="mobile-cart-label">Actions:</span>
                    <span className="mobile-cart-value">
                      <button 
                        onClick={() => handleRemove(product.id)}
                        className="remove-btn-mobile"
                      >
                        Remove
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
            
            {cartItems.length > 0 && (
              <div className="mobile-total">
                Total: {formatPrice(totalPrice)} TND
              </div>
            )}
          </div>

          {/* DESKTOP VIEW - Table Layout */}
          <div className="desktop-cart-view">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(({ product, quantity }) => {
                  const subtotal = parsePrice(product.price) * quantity;
                  return (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{quantity}</td>
                      <td>{product.price} TND</td>
                      <td>{formatPrice(subtotal)} TND</td>
                      <td>
                        <button onClick={() => handleRemove(product.id)}>Remove</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{formatPrice(totalPrice)} TND</strong>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="payment-options">
            <h3>Payment Options</h3>
            <button onClick={handlePayWithCard}>Pay with Card</button>
            <button onClick={handlePayWithCash}>Pay with Cash</button>
          </div>
        </div>
      )}

      {/* Card Payment Modal */}
      {showCardModal && (
        <div className="modal-overlay" onClick={handleCloseCardModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#dc3545' }}>Card Payment Unavailable</h3>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
                ⚠️ Card payment is currently not available.
              </p>
              <p style={{ color: '#666', marginBottom: '25px' }}>
                Please use the "Pay with Cash" option for now. We're working to bring card payments soon!
              </p>
              <button 
                onClick={handleCloseCardModal}
                style={{
                  padding: '10px 25px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                OK, I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cash Payment Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Enter Your Details</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Address</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={handleCloseModal}>Cancel</button>
                <button type="submit">Submit Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;