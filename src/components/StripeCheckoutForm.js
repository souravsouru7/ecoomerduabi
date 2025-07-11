import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import paymentService from '../services/paymentService';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const StripeCheckoutForm = ({ customerInfo, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create payment intent when component mounts
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setError(null);

      // For simplicity, we'll process the first item in cart
      // In a real app, you might want to create separate intents or handle multiple items
      const firstItem = cartItems[0];
      if (!firstItem) {
        throw new Error('No items in cart');
      }

      const response = await paymentService.createPaymentIntent(
        firstItem.id,
        firstItem.quantity,
        customerInfo
      );

      if (response.success) {
        setClientSecret(response.clientSecret);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            address: {
              line1: customerInfo.address,
              country: 'AE'
            }
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment successful
        clearCart();
        onSuccess && onSuccess(paymentIntent);
        navigate('/payment/success');
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !clientSecret) {
    return (
      <div className="loading">
        <p>Setting up payment...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <div className="card-element-container">
          <CardElement
            id="card-element"
            options={CARD_ELEMENT_OPTIONS}
          />
        </div>
      </div>

      {error && (
        <div className="error" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="pay-btn"
      >
        {loading ? 'Processing...' : `Pay AED ${getCartTotal().toFixed(2)}`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm; 