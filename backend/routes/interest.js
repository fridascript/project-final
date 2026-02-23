import express from 'express';
import mongoose from 'mongoose';
import { Interest } from '../models/Interest.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { productId, name, email, phone, message } = req.body;
    
    const interest = new Interest({ productId, name, email, phone, message });
    await interest.save();
    
    res.status(201).json({ message: 'Interest saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-interests/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    //find product by the artist
    const products = await mongoose.model('Product').find({ creator: userId });
    const productIds = products.map(p => p._id);
    
    // find all interest of the product 
    const interests = await Interest.find({ productId: { $in: productIds } })
      .populate('productId', 'title image');
    
    res.status(200).json({ success: true, response: interests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;