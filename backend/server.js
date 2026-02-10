import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


// MongoDB connection not connected yet!
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/manomano";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

//import routes
import authRoutes from "./routes/auth.js"
import productRoutes from './routes/products.js';


//use routes
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);

//documentation for endpoints
app.get("/", (req, res) => {
  res.json({
    message: "manomano API",
    endpoints: [
      {
        path: "/api/auth/register",
        method: "POST",
        description: "Register a new user",
        body: { name: "string", email: "string", password: "string" }
      },
      {
        path: "/api/auth/login",
        method: "POST",
        description: "Log in (returns accessToken)",
        body: { email: "string", password: "string" }
      },
      {
        path: "/api/products",
        method: "GET",
        description: "Get all products"
      },
      {
        path: "/api/products",
        method: "POST",
        description: "Create a new product",
        body: { title: "string", image: "string", category: "string", forSale: "boolean", price: "number", creator: "userId" }
      }
    ]
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
