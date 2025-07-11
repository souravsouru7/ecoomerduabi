import axios from 'axios';
import { API_BASE_URL } from '../config/stripe';

class PaymentService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Create payment intent for Stripe Elements
  async createPaymentIntent(productId, quantity, customerInfo) {
    try {
      const response = await this.api.post('/api/payment/create-intent', {
        productId,
        quantity,
        customerInfo
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create payment intent');
    }
  }

  // Create checkout session for Stripe Checkout
  async createCheckoutSession(productId, quantity, customerInfo) {
    try {
      const response = await this.api.post('/api/payment/checkout', {
        productId,
        quantity,
        customerInfo
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create checkout session');
    }
  }

  // Get payment intent status
  async getPaymentIntentStatus(paymentIntentId) {
    try {
      const response = await this.api.get(`/api/payment/intent/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  }

  // Get checkout session status
  async getCheckoutSessionStatus(sessionId) {
    try {
      const response = await this.api.get(`/api/payment/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get session status');
    }
  }

  // Get Stripe configuration
  async getStripeConfig() {
    try {
      const response = await this.api.get('/api/payment/config');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get Stripe configuration');
    }
  }
}

export default new PaymentService(); 