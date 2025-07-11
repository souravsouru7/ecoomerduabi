import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useContext(CartContext);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <button 
          className="checkout-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img 
            src={item.image} 
            alt={item.name} 
            className="cart-item-image"
          />
          
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>Price: AED {item.price.toFixed(2)}</p>
          </div>
          
          <div>
            <label>Quantity: </label>
            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          <div className="cart-item-price">
            AED {(item.price * item.quantity).toFixed(2)}
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id)}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </div>
      ))}
      
      <div className="cart-total">
        Total: AED {getCartTotal().toFixed(2)}
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        
        <button 
          onClick={clearCart}
          style={{
            background: '#95a5a6',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart; 