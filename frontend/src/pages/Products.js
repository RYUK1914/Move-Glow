import React, { useState, useContext } from 'react';
import products from '../data/products';
import { CartContext } from '../context/CartContext';
import './Products.css';

const Products = () => {
  const { addItem } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );
  
  const [flippedCards, setFlippedCards] = useState({});

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleBuy = (product) => {
    const quantity = quantities[product.id];
    addItem(product, quantity);
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  const toggleFlip = (productId) => {
    setFlippedCards(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // CORRECTED ingredients for each product
  const productIngredients = {
    1: 'orange - citron - carotte - gingembre',
    2: 'betteraves - pomme - carottes - citron - gingembre',
    3: 'grenade - betterave - menthe',
    4: 'ananas frais - pomme - concombre - menthe',
    5: 'pomme - concombre - céleri - gingembre - menthe',
    6: 'kiwi - pomme - menthe - concombre',
    7: 'pastèque - citron - menthe',
    8: 'pommes - citron - gingembre'
  };

  // Define benefits/effects for each product
  const productBenefits = {
    1: 'Rich in Vitamin C • Boosts immunity • Improves digestion • Anti-inflammatory',
    2: 'Boosts energy • Improves circulation • Detoxifies liver • Heart health',
    3: 'Powerful antioxidants • Anti-aging • Improves blood flow • Refreshing',
    4: 'Aids digestion • Reduces bloating • Hydrating • Rich in enzymes',
    5: 'Alkalizes body • Natural detox • Reduces inflammation • Rich in fiber',
    6: 'High in Vitamin C • Hydrates skin • Aids digestion • Natural cooling',
    7: 'Excellent hydration • Natural diuretic • Cooling effect • Reduces inflammation',
    8: 'Boosts metabolism • Anti-inflammatory • Aids digestion • Energy booster'
  };

  // Define back images for each product from assets/images
  const backImages = {
    1: require('../assets/images/cat1.png'),
    2: require('../assets/images/cat2.png'),
    3: require('../assets/images/cat3.png'),
    4: require('../assets/images/cat4.png'),
    5: require('../assets/images/cat5.png'),
    6: require('../assets/images/cat6.png'),
    7: require('../assets/images/cat7.png'),
    8: require('../assets/images/cat8.png')
  };

  // Updated product names (all 8 products)
  const updatedProducts = products.map((product, index) => {
    const newNames = [
      'citrus fuel',
      'booster',
      'beauty glow',
      'fresh glow',
      'pure green',
      'vital glow',
      'water glow',
       'zesty power' //'pure green'
    ];
    return {
      ...product,
      name: newNames[index] || product.name
    };
  });

  return (
    <div className="products">
      <div className="products-header">
        <h1 className="products-title">Our Fresh Juices</h1>
        <p className="products-subtitle">Press any card to flip and discover benefits!</p>
      </div>
      <div className="product-list">
        {updatedProducts.map((product, index) => {
          const productId = product.id;
          const isFlipped = flippedCards[productId];
          
          return (
            <div 
              key={productId} 
              className={`product ${isFlipped ? 'flipped' : ''}`}
              onClick={() => toggleFlip(productId)}
            >
              <div className="product-inner">
                {/* Front Side - Split into two parts: 2/3 image, 1/3 info */}
                <div className="product-front">
                  {/* Top 2/3 - Image */}
                  <div className="front-top">
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} className="product-img" />
                      <div className="product-badge">Fresh!</div>
                    </div>
                  </div>
                  
                  {/* Bottom 1/3 - Product Info - COMPACT LAYOUT */}
                  <div className="front-bottom">
                    <div className="product-info-final">
                      <h3 className="product-name-final">{product.name}</h3>
                      
                      <div className="price-final">
                        <span className="product-price-final">{product.price}</span>
                      </div>
                      
                      {/* COMPACT: Combined quantity and button container */}
                      <div className="quantity-button-compact">
                        <div className="quantity-compact">
                          <div className="quantity-control-compact">
                            <button 
                              className="quantity-btn-compact minus"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(productId, Math.max(1, quantities[productId] - 1));
                              }}
                            >-</button>
                            <span className="quantity-value-compact">{quantities[productId]}</span>
                            <button 
                              className="quantity-btn-compact plus"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(productId, quantities[productId] + 1);
                              }}
                            >+</button>
                          </div>
                        </div>
                        
                        <button 
                          className="buy-btn-compact"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuy(product);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                      
                      {/* Empty space below button */}
                      <div className="button-space"></div>
                    </div>
                  </div>
                </div>

                {/* Back Side - 2/3 image, 1/3 ingredients & benefits */}
                <div className="product-back">
                  {/* Top 2/3 - Image */}
                  <div className="back-image">
                    <img src={backImages[productId]} alt={`${product.name} ingredients`} className="back-img" />
                    <div className="image-overlay">
                      <p className="flip-hint">Click to flip back</p>
                    </div>
                  </div>
                  
                  {/* Bottom 1/3 - Ingredients & Benefits */}
                  <div className="back-ingredients">
                    <h3 className="ingredients-title">INGREDIENTS & BENEFITS</h3>
                    <div className="ingredients-container">
                      <div className="ingredients-section">
                        <h4 className="section-title">Ingredients:</h4>
                        <div className="ingredients-text">
                          {productIngredients[productId]}
                        </div>
                      </div>
                      <div className="benefits-section">
                        <h4 className="section-title">Benefits:</h4>
                        <div className="benefits-text">
                          {productBenefits[productId]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;