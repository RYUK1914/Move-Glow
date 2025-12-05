const Order = require('../models/Order');
const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password for Gmail
  },
});

const createOrder = async (req, res) => {
  try {
    const { customer, items, totalPrice, paymentMethod } = req.body;

    // Create new order
    const newOrder = new Order({
      customer,
      items,
      totalPrice,
      paymentMethod,
    });

    // Save order to database
    await newOrder.save();

    // Prepare email content
    const itemsList = items.map(item => 
      `${item.product.name} - Quantity: ${item.quantity} - Subtotal: ${item.subtotal} TND`
    ).join('\n');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'badiellamnzakaria@gmail.com',
      subject: 'New Order Received - Devis',
      text: `
        New Order Details:

        Customer Information:
        Name: ${customer.name} ${customer.lastName}
        Phone: ${customer.phone}
        Address: ${customer.address}

        Order Items:
        ${itemsList}

        Total Price: ${totalPrice} TND
        Payment Method: ${paymentMethod}

        Order Status: Pending
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

module.exports = { createOrder };
