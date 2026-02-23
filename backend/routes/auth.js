import express from "express";
import bcrypt from "bcrypt"; 
import User from "../models/user.js"

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
    res.status(200).json({ success: true, response: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export default router; 