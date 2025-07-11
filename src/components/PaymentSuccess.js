import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const PaymentSuccess = () => {
  const { clearCart } = useContext(CartContext);

  // Clear cart on successful payment
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="payment-result">
      <div className="success-icon">✅</div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <p>You will receive an email confirmation shortly.</p>
      <Link to="/" className="back-home-btn">
        Continue Shopping
      </Link>
    </div>
  );
};

export default PaymentSuccess; 