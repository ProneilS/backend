// backend/controllers/contact.controller.js
const Contact = require('../models/contact.model');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required"
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Save to database
    const newEntry = await Contact.create({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      message: message.trim() 
    });

    res.status(201).json({ 
      success: true,
      message: "Message sent successfully! Thank you for reaching out.",
      data: {
        id: newEntry.id,
        name: newEntry.name,
        email: newEntry.email,
        createdAt: newEntry.createdAt
      }
    });

  } catch (error) {
    console.error("❌ Error saving contact message:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};
