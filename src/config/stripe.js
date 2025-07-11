// Stripe Configuration for Frontend
import { loadStripe } from '@stripe/stripe-js';
import API_BASE_URL from './api';

// Your Stripe publishable key (replace with your actual key)
const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_...';

// Load Stripe
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Stripe Configuration
export const STRIPE_CONFIG = {
  currency: 'aed',
  country: 'AE',
  language: 'en'
}; 