import express from "express";
import Product from "../models/product.js";
import { parser } from '../config/cloudinary.js';

const router = express.Router();



// *** routes *** 

// route: create new product post
router.post("/",parser.single("image"), async (req, res) => {
  try {
    const { title, category, forSale, price, creator} = req.body;
    const imageUrl = req.file.path;

    const product = new Product ({
      title,
      image: imageUrl,
      category,
      forSale,
      price,
      creator,
    }); 

    await product.save();

    res.status(201).json ({
      success: true,
      message: "Product post created",
      response: product
    });

   } catch (error) {
    console.log('ERROR:', error); 
    res.status(400).json({
      success: false,
      message: 'Could not create product',
      response: error.message 
    });
  }
}); 


// route: get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('creator', 'name email profileImage')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      response: products
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch products',
      response: error
    });
  }
});

export default router;