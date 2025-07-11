# Stripe Frontend Configuration

This guide will help you configure Stripe in the frontend of your UAE e-commerce application.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Your Stripe publishable key from the Stripe Dashboard

## Setup Steps

### 1. Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# API Configuration
REACT_APP_API_URL=http://localhost:3000
```

**Important:** Replace `pk_test_your_stripe_publishable_key_here` with your actual Stripe publishable key.

### 3. Backend Configuration

Make sure your backend is properly configured with:
- Stripe secret key in the backend `.env` file
- All Stripe API endpoints are working
- CORS is properly configured

### 4. Test the Integration

1. Start your backend server: `node index.js`
2. Start your frontend: `npm start`
3. Add items to cart and proceed to checkout
4. Test both payment methods:
   - **Stripe Elements**: Embedded card form
   - **Stripe Checkout**: Redirect to Stripe's hosted page

## Payment Methods Available

### 1. Stripe Elements (Embedded)
- Card form embedded directly in your checkout page
- Real-time validation
- Customizable styling
- Better user experience

### 2. Stripe Checkout (Redirect)
- Redirects to Stripe's hosted checkout page
- Handles all payment methods automatically
- PCI compliant
- Less customization but more secure

## Testing

Use these test card numbers for testing:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

Expiry date: Any future date (e.g., `12/25`)
CVC: Any 3 digits (e.g., `123`)

## Troubleshooting

### Common Issues

1. **"Stripe is not defined"**
   - Make sure you've added your publishable key to the `.env` file
   - Restart your development server after adding environment variables

2. **"Invalid API key"**
   - Check that you're using the correct publishable key (not secret key)
   - Ensure the key is for the correct environment (test/live)

3. **CORS errors**
   - Make sure your backend CORS configuration includes your frontend URL
   - Check that the API_BASE_URL is correct

4. **Payment fails**
   - Check the browser console for error messages
   - Verify your backend Stripe configuration
   - Ensure you're using test cards in test mode

## Security Notes

- Never expose your Stripe secret key in the frontend
- Always use environment variables for sensitive configuration
- The publishable key is safe to use in the frontend
- All sensitive operations should be handled by your backend

## Production Deployment

For production:

1. Switch to live mode in Stripe Dashboard
2. Use live publishable key (`pk_live_...`)
3. Update your backend to use live secret key
4. Configure proper domain URLs in Stripe Dashboard
5. Set up webhook endpoints for payment confirmations

## Support

For more information:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout) 