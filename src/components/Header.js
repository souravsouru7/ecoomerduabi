import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          UAE Shop
        </Link>
        
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/cart" className="cart-icon">
                🛒 Cart
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 