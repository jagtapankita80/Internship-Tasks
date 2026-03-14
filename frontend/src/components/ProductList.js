import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // getting global user state

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data } = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error("Failed to delete:", error);
        alert(error.response?.data?.error || "Error deleting product");
      }
    }
  };

  if (loading) return <div className="loading-state">Loading products...</div>;

  return (
    <div className="glass-card">
      <div className="page-header">
        <h2>Products</h2>
        {user && <Link to="/add" className="btn btn-primary">+ Add New</Link>}
      </div>
      
      {products.length === 0 ? (
        <div className="empty-state">No products found. Add some!</div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="glass-card product-card" key={product._id}>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">${product.price}</div>
                <div className={`product-status ${product.inStock ? 'status-instock' : 'status-outstock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              <div className="product-actions">
                <Link to={`/product/${product._id}`} className="btn btn-secondary">
                  {user ? "View / Edit" : "View"}
                </Link>
                {user && (
                  <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
