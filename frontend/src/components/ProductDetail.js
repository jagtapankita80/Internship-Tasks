import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // The backend in task 1 doesn't have a GET /:id route, 
        // so we fetch all and filter to stay robust.
        const { data } = await fetchProducts();
        const found = data.find(p => p._id === id);
        
        if (found) {
          setProduct(found);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch details:", err);
        setError("Error loading product details");
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        navigate('/');
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete product");
      }
    }
  };

  if (loading) return <div className="loading-state">Loading product details...</div>;
  if (error) return <div className="loading-state">{error} <br/><br/><Link to="/" className="btn btn-primary">Go Back</Link></div>;
  if (!product) return null;

  return (
    <div className="form-container">
      <div className="glass-card">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>{product.name}</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ID: {product._id}</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>${product.price}</p>
          <div className={`product-status ${product.inStock ? 'status-instock' : 'status-outstock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <Link to="/" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
            Back to List
          </Link>
          <button onClick={handleDelete} className="btn btn-danger" style={{ flex: 1 }}>
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
