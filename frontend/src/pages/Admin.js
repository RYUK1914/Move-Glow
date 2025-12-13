import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/products';
import './Contact.css';

const Admin = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image: '',
    backImage: '', // For the back of the card
    ingredients: '', // For the ingredients section
    benefits: '' // For the benefits section
  });

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/login');
    }
    
    // Load products from localStorage if available, else use imported products
    const savedProducts = localStorage.getItem('moveglow_products');
    if (savedProducts) {
      setProductList(JSON.parse(savedProducts));
    }
  }, [navigate]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddingNew(false);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description || '',
      image: product.image,
      backImage: product.backImage || `/images/cat${product.id}.png`,
      ingredients: product.ingredients || getDefaultIngredients(product.id),
      benefits: product.benefits || getDefaultBenefits(product.id)
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    
    // Generate a new unique ID
    const newId = productList.length > 0 ? Math.max(...productList.map(p => p.id)) + 1 : 9;
    
    setFormData({
      id: newId,
      name: '',
      price: '',
      description: '',
      image: '',
      backImage: `/images/cat${newId}.png`,
      ingredients: '',
      benefits: ''
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (isAddingNew) {
      // Add new product
      const newProduct = {
        id: formData.id,
        name: formData.name,
        price: formData.price,
        description: formData.description,
        image: formData.image,
        backImage: formData.backImage,
        ingredients: formData.ingredients,
        benefits: formData.benefits
      };
      
      const updatedProducts = [...productList, newProduct];
      setProductList(updatedProducts);
      localStorage.setItem('moveglow_products', JSON.stringify(updatedProducts));
      setIsAddingNew(false);
      
    } else if (editingProduct) {
      // Update existing product
      const updatedProducts = productList.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              name: formData.name,
              price: formData.price,
              description: formData.description,
              image: formData.image,
              backImage: formData.backImage,
              ingredients: formData.ingredients,
              benefits: formData.benefits
            } 
          : p
      );
      
      setProductList(updatedProducts);
      localStorage.setItem('moveglow_products', JSON.stringify(updatedProducts));
      setEditingProduct(null);
    }
    
    // Reset form
    setFormData({
      id: '',
      name: '',
      price: '',
      description: '',
      image: '',
      backImage: '',
      ingredients: '',
      benefits: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = productList.filter(p => p.id !== id);
      setProductList(updatedProducts);
      localStorage.setItem('moveglow_products', JSON.stringify(updatedProducts));
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
    setFormData({
      id: '',
      name: '',
      price: '',
      description: '',
      image: '',
      backImage: '',
      ingredients: '',
      benefits: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  // Helper functions for default values
  const getDefaultIngredients = (id) => {
    const defaultIngredients = {
      1: 'orange - citron - carotte - gingembre',
      2: 'betteraves - pomme - carottes - citron - gingembre',
      3: 'grenade - betterave - menthe',
      4: 'ananas frais - pomme - concombre - menthe',
      5: 'pomme - concombre - céleri - gingembre - menthe',
      6: 'kiwi - pomme - menthe - concombre',
      7: 'pastèque - citron - menthe',
      8: 'pommes - citron - gingembre'
    };
    return defaultIngredients[id] || '';
  };

  const getDefaultBenefits = (id) => {
    const defaultBenefits = {
      1: '• Rich in Vitamin C\n• Boosts immunity\n• Improves digestion\n• Anti-inflammatory',
      2: '• Boosts energy\n• Improves circulation\n• Detoxifies liver\n• Heart health',
      3: '• Powerful antioxidants\n• Anti-aging\n• Improves blood flow\n• Refreshing',
      4: '• Aids digestion\n• Reduces bloating\n• Hydrating\n• Rich in enzymes',
      5: '• Alkalizes body\n• Natural detox\n• Reduces inflammation\n• Rich in fiber',
      6: '• High in Vitamin C\n• Hydrates skin\n• Aids digestion\n• Natural cooling',
      7: '• Excellent hydration\n• Natural diuretic\n• Cooling effect\n• Reduces inflammation',
      8: '• Boosts metabolism\n• Anti-inflammatory\n• Aids digestion\n• Energy booster'
    };
    return defaultBenefits[id] || '';
  };

  return (
    <div className="contact admin-panel">
      <div className="admin-header">
        <h1>Admin Panel - Manage Juice Cards</h1>
        <div className="admin-actions">
          <button onClick={handleAddNew} className="add-new-btn">
            + Add New Card
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Form for Adding/Editing */}
      {(isAddingNew || editingProduct) && (
        <div className="admin-form-section">
          <h2>{isAddingNew ? 'Add New Card' : 'Edit Card'}</h2>
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Card Name *</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  placeholder="e.g., tropical blast" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Price *</label>
                <input 
                  type="text" 
                  value={formData.price} 
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                  placeholder="e.g., $6.99" 
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Front Image URL *</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                  placeholder="https://example.com/juice-image.jpg" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Back Image URL</label>
                <input 
                  type="text" 
                  value={formData.backImage} 
                  onChange={(e) => setFormData({ ...formData, backImage: e.target.value })} 
                  placeholder="https://example.com/back-image.png" 
                />
                <small>Leave empty for default: {formData.backImage}</small>
              </div>
            </div>

            <div className="form-group">
              <label>Ingredients *</label>
              <textarea 
                value={formData.ingredients} 
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} 
                placeholder="orange - citron - carotte - gingembre (separate with - )" 
                rows="2"
                required 
              />
            </div>

            <div className="form-group">
              <label>Benefits *</label>
              <textarea 
                value={formData.benefits} 
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} 
                placeholder="• Rich in Vitamin C\n• Boosts immunity\n• Improves digestion\n• Anti-inflammatory" 
                rows="4"
                required 
              />
              <small>Enter one benefit per line starting with •</small>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                placeholder="Optional description for the product" 
                rows="3"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {isAddingNew ? 'Add Card' : 'Save Changes'}
              </button>
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <div className="product-management">
        <h2>Existing Cards ({productList.length})</h2>
        <div className="product-grid">
          {productList.map(product => (
            <div key={product.id} className="product-card-admin">
              <div className="product-preview">
                <div className="product-image-preview">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info-preview">
                  <h3>{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <p className="product-ingredients">
                    {product.ingredients ? product.ingredients.substring(0, 50) + '...' : 'No ingredients'}
                  </p>
                </div>
              </div>
              <div className="product-actions">
                <button onClick={() => handleEdit(product)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;