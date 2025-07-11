import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
      setProduct(response.data.data);
    } catch (err) {
      setError('Product not found');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="error">{error || 'Product not found'}</div>;
  }

  return (
    <div className="product-detail">
      <div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-detail-image"
        />
      </div>
      
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-price">AED {product.price.toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>
        
        <div className="quantity-selector">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            min="1"
            max={product.stock}
          />
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
        
        <p>Stock: {product.stock} available</p>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          style={{ marginBottom: '1rem' }}
        >
          Add to Cart
        </button>
        
        <button 
          className="buy-now-btn"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail; 