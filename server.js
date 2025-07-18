// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db.config');
const contactRoutes = require('./routes/contact.routes');
const Contact = require('./models/contact.model');

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000', 
    'https://proneil.dev',
    'https://www.proneil.dev'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Database connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('❌ Error: ' + err));

sequelize.sync({ alter: true })
  .then(() => console.log('🔁 DB synced'))
  .catch(err => console.error('❌ DB Sync Error:', err));

// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '🌐 Contact Form API is live',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
