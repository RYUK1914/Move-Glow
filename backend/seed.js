const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Green Glow Juice',
    price: 5.99,
    description: 'A refreshing blend of green vegetables and fruits for ultimate glow.',
    image: '/assets/images/1c.png',
  },
  {
    name: 'Berry Blast Juice',
    price: 6.49,
    description: 'Bursting with antioxidant-rich berries for a healthy boost.',
    image: '/assets/images/b1.png',
  },
  {
    name: 'Citrus Sunrise Juice',
    price: 5.79,
    description: 'Start your day with this zesty citrus blend.',
    image: '/assets/images/b2.png',
  },
  {
    name: 'Tropical Paradise Juice',
    price: 6.99,
    description: 'Escape to paradise with exotic tropical fruits.',
    image: '/assets/images/f1.png',
  },
  {
    name: 'Detox Delight Juice',
    price: 7.49,
    description: 'Cleanse and detoxify with this powerful green juice.',
    image: '/assets/images/p1.png',
  },
  {
    name: 'Energy Elixir Juice',
    price: 6.29,
    description: 'Fuel your body with natural energy-boosting ingredients.',
    image: '/assets/images/v1.png',
  },
  {
    name: 'Immune Boost Juice',
    price: 7.99,
    description: 'Strengthen your immune system with vitamin-rich fruits.',
    image: '/assets/images/w1.png',
  },
  {
    name: 'Calm & Relax Juice',
    price: 6.79,
    description: 'Unwind with this soothing blend of calming herbs and fruits.',
    image: '/assets/images/z1.png',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moveglow');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
