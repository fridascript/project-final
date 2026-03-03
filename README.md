# MANOMANO 🏺

As my final project I decided to combine my two current hyper fixations: building websites and crafts (in my case ceramics).

MANOMANO is a marketplace for hobby artists to showcase and sell their handmade items. Instead of public transactions, visitors can express interest and connect directly with the artist to complete purchases privately. The platform offers a more personal alternative space for hobby artists to show and sell their work. To post your items you register and log in, for visitors only there's no need to sign up. 

## The Problem

I wanted to build something that felt personal and different from big e-commerce platforms like Etsy. The solution was an interest-based system where buyers reach out directly to artists, keeping the transaction human and private.

**Planning & approach:**
- Designed the UI in Figma before building
- Built a REST API with Node/Express and MongoDB
- Used Cloudinary for image uploads
- Implemented authentication with bcrypt and access tokens
- Managed global auth state with Zustand

**Future adds**
- Email notifications when a new interest is received
- Ability to reply to messages directly in the app
- To be able to save an object as a favorite

## Tech Stack

- **Frontend:** React, Styled Components, Zustand, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** Cloudinary (image uploads), bcrypt (auth), Render (backend hosting), Netlify (frontend hosting)

## View it live

- 🌐 Frontend: https://manoamano.netlify.app
- 🔧 Backend: https://manomano-backend.onrender.com

