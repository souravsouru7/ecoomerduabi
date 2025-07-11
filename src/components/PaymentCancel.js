import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="payment-result">
      <div className="cancel-icon">❌</div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled or failed.</p>
      <p>No charges were made to your account.</p>
      <Link to="/cart" className="back-home-btn">
        Return to Cart
      </Link>
    </div>
  );
};

export default PaymentCancel; 