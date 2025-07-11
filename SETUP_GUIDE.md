# Complete Setup Guide for UAE E-commerce with Stripe

## 🚀 Quick Start

### 1. Backend Setup (Already Done ✅)
Your backend is already configured with:
- Express server running on port 3000
- Stripe integration with payment intents and checkout sessions
- Product API endpoints
- CORS enabled

### 2. Frontend Setup

#### Step 1: Create Environment File
Create a `.env` file in the `frontend` directory:

```env
# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# API Configuration  
REACT_APP_API_URL=http://localhost:3000
```

#### Step 2: Get Your Stripe Publishable Key
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Replace `pk_test_your_stripe_publishable_key_here` in the `.env` file

#### Step 3: Start the Application

**Terminal 1 - Backend:**
```bash
cd /c/Users/souta/Desktop/tyre\ for\ dubai/demo
npm install
node index.js
```

**Terminal 2 - Frontend:**
```bash
cd /c/Users/souta/Desktop/tyre\ for\ dubai/demo/frontend
npm install
npm start
```

## 🛍️ How to Use the Application

### 1. Browse Products
- Visit `http://localhost:3001` (frontend)
- You'll see products loaded from the backend API
- Products include: iPhone 15 Pro, MacBook Air M2, Nike Air Max, Samsung 4K TV, Adidas T-Shirt

### 2. Add to Cart
- Click "Add to Cart" on any product
- View cart by clicking the cart icon in the header

### 3. Checkout with Stripe
- Go to checkout page
- Fill in customer information
- Choose payment method:
  - **Stripe Elements**: Embedded card form
  - **Stripe Checkout**: Redirect to Stripe's page

### 4. Test Payments
Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)

## 🔧 API Endpoints Available

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search/:query` - Search products

### Payments
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/payment/checkout` - Create Stripe checkout session
- `GET /api/payment/intent/:id` - Get payment intent status
- `GET /api/payment/session/:id` - Get checkout session status
- `GET /api/payment/config` - Get Stripe configuration

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/purchase` - Legacy purchase (without Stripe)

## 🎨 Features Included

### Frontend Components
- ✅ Product listing with images and prices
- ✅ Product detail pages
- ✅ Shopping cart with quantity management
- ✅ Checkout with customer information
- ✅ Two payment methods (Stripe Elements & Checkout)
- ✅ Payment success/cancel pages
- ✅ Responsive design

### Backend Features
- ✅ RESTful API with Express
- ✅ Stripe payment integration
- ✅ Product management
- ✅ Order tracking
- ✅ CORS configuration
- ✅ Error handling

## 🐛 Troubleshooting

### Common Issues

1. **"Stripe is not defined"**
   - Check your `.env` file has the correct publishable key
   - Restart the frontend server after adding environment variables

2. **"Failed to fetch products"**
   - Make sure backend is running on port 3000
   - Check browser console for CORS errors

3. **"Invalid API key"**
   - Use publishable key (starts with `pk_test_`), not secret key
   - Ensure you're in test mode for development

4. **Payment fails**
   - Use test card numbers only
   - Check browser console for error messages
   - Verify backend Stripe configuration

### Debug Steps
1. Check browser console (F12) for errors
2. Check backend console for server errors
3. Verify environment variables are loaded
4. Test API endpoints directly in browser

## 🔒 Security Notes

- ✅ Publishable key is safe for frontend
- ✅ Secret key stays in backend only
- ✅ All payments go through Stripe's secure servers
- ✅ PCI compliant payment processing

## 📱 Mobile Responsive

The application is fully responsive and works on:
- Desktop browsers
- Mobile phones
- Tablets

## 🚀 Next Steps

1. **Customize Products**: Update the product data in `index.js`
2. **Add Database**: Replace in-memory storage with a real database
3. **Add Authentication**: Implement user login/signup
4. **Add Admin Panel**: Create product management interface
5. **Go Live**: Switch to Stripe live mode for production

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review browser console errors
3. Verify all environment variables are set
4. Ensure both backend and frontend are running

Your UAE e-commerce application is now ready with full Stripe integration! 🎉 