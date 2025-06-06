const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Mock payment gateway client
const paymentGateway = {
  charge: async (paymentDetails) => {
    // In a real app, this would call the actual payment gateway API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: 'txn_' + Math.random().toString(36).substr(2, 12)
        });
      }, 1000);
    });
  }
};

app.post('/api/payments', async (req, res) => {
  try {
    // Validate request
    const { cardNumber, cardName, expiryDate, cvv, amount, email } = req.body;
    
    if (!cardNumber || !cardName || !expiryDate || !cvv || !amount || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Process payment
    const result = await paymentGateway.charge({
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      amount,
      email
    });
    
    if (!result.success) {
      return res.status(400).json({ error: 'Payment failed' });
    }
    
    // Save transaction to database (in a real app)
    
    res.json({
      success: true,
      transactionId: result.transactionId,
      amount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});