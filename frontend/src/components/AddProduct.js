import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';

function AddProduct() {
  const [formData, setFormData] = useState({ name: '', price: '', inStock: true });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await createProduct(formData);
      navigate('/');
    } catch (err) {
      setError("Failed to create product. Please try again.");
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="glass-card">
        <h2 style={{ marginBottom: '1.5rem' }}>Add New Product</h2>
        
        {error && <div className="btn-danger" style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              name="price"
              className="form-input"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              style={{ width: '1.2rem', height: '1.2rem' }}
            />
            <label htmlFor="inStock" className="form-label" style={{ marginBottom: 0 }}>In Stock</label>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ flex: 1 }}>
              {isSubmitting ? 'Saving...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
