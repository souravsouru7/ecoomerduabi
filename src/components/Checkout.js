import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StripeCheckoutForm from './StripeCheckoutForm';
import StripeCheckoutRedirect from './StripeCheckoutRedirect';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState('elements'); // 'elements' or 'redirect'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-form">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <button 
          className="back-home-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <h1>Checkout</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '0.5rem' 
          }}>
            <span>{item.name} x {item.quantity}</span>
            <span>AED {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div style={{ 
          borderTop: '2px solid #eee', 
          paddingTop: '1rem', 
          marginTop: '1rem',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          Total: AED {getCartTotal().toFixed(2)}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <div className="payment-method-selector">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="elements"
                checked={paymentMethod === 'elements'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay with Card (Stripe Elements)
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="redirect"
                checked={paymentMethod === 'redirect'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay with Stripe Checkout (Redirect)
            </label>
          </div>
        </div>

        {paymentMethod === 'elements' ? (
          <StripeCheckoutForm 
            customerInfo={customerInfo}
            onSuccess={(paymentIntent) => {
              console.log('Payment successful:', paymentIntent);
            }}
            onError={(error) => {
              console.error('Payment failed:', error);
            }}
          />
        ) : (
          <StripeCheckoutRedirect customerInfo={customerInfo} />
        )}
      </form>
    </div>
  );
};

export default Checkout; 