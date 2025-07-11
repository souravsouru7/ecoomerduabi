import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import paymentService from '../services/paymentService';

const StripeCheckoutRedirect = ({ customerInfo }) => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckoutRedirect = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
      setError('Please fill in all customer information');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For simplicity, we'll process the first item in cart
      // In a real app, you might want to handle multiple items differently
      const firstItem = cartItems[0];
      if (!firstItem) {
        throw new Error('No items in cart');
      }

      const response = await paymentService.createCheckoutSession(
        firstItem.id,
        firstItem.quantity,
        customerInfo
      );

      if (response.success && response.sessionUrl) {
        // Redirect to Stripe Checkout
        window.location.href = response.sessionUrl;
      } else {
        throw new Error(response.message || 'Failed to create checkout session');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stripe-checkout-redirect">
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <span>{item.name} x {item.quantity}</span>
            <span>AED {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-total">
          <strong>Total: AED {getCartTotal().toFixed(2)}</strong>
        </div>
      </div>

      {error && (
        <div className="error" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <button
        onClick={handleCheckoutRedirect}
        disabled={loading}
        className="checkout-btn"
      >
        {loading ? 'Redirecting to Stripe...' : 'Proceed to Stripe Checkout'}
      </button>

      <p className="checkout-note">
        You will be redirected to Stripe's secure checkout page to complete your payment.
      </p>
    </div>
  );
};

export default StripeCheckoutRedirect; 