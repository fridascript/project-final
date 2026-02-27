import express from "express";
import bcrypt from "bcrypt"; 
import User from "../models/User.js";
import { parser } from '../config/cloudinary.js';

// handles register user and log in user
const router = express.Router();

//*** routes ***

// route: register new user 
router.post('/register', async (req, res) =>{
  try {
    const {name, email, password } = req.body;

// check if user already exists
const existingUser = await User.findOne({ email: email.toLowerCase() });
if (existingUser) {
  return res.status(400).json({
     success: false,
     message: "This email address is already connected to an account"
    });
}

// hash password
const salt = bcrypt.genSaltSync();
const user = new User({
  name,
  email: email.toLowerCase(),
  password: bcrypt.hashSync(password, salt)
});

//save user
await user.save();

//response
res.status(201).json ({
  success: true,
  message: "User created!",
  response: {
    userId: user._id,
    name: user.name,
    email: user.email,
    accessToken: user.accessToken
  }
});

 } catch (error) {
  console.log('Register error:', error); 
  res.status(500).json({
    success: false,
    message: "Could not create user", 
    response: error
  });
}
});


// route: log in user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne ({ email: email.toLowerCase () });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        response: {
          userId: user._id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken
        }
        });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      response: error
    });
  }
});

// identifies who is logged in "hi, username "
router.get('/me', async (req, res) => {
  try {
    const user = await User.findOne({ accessToken: req.headers.authorization });
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    res.status(200).json({ success: true, response: { name: user.name, email: user.email, bio: user.bio, profileImage: user.profileImage, headerImage: user.headerImage } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/me', parser.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'headerImage', maxCount: 1 }]), async (req, res) => {
  try {
    const user = await User.findOne({ accessToken: req.headers.authorization });
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { name, bio } = req.body;
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (req.file) user.profileImage = req.file.path;
    if (req.files && req.files.headerImage) user.headerImage = req.files.headerImage[0].path;


    await user.save();
    res.status(200).json({ success: true, response: { name: user.name, bio: user.bio, profileImage: user.profileImage } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('name bio profileImage headerImage');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, response: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});




export default router; 