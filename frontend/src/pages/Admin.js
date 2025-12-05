import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/products';
import './Contact.css'; // Reuse Contact.css for styling

const Admin = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image
    });
  };

  const handleSave = () => {
    if (editingProduct) {
      setProductList(productList.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '', image: '' });
    }
  };

  const handleDelete = (id) => {
    setProductList(productList.filter(p => p.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="contact">
      <h1>Admin Panel</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>
      <h2>Manage Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {productList.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Delete</button>
          </div>
        ))}
      </div>
      {editingProduct && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h3>Edit Product</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingProduct(null)} style={{ marginLeft: '10px' }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
