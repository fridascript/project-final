import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Ceramics', 'Textile', 'Jewelry', 'Art', 'Other']
  },

  color: {
  type: String,
  enum: ['','White', 'Black', 'Brown', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Grey', 'Multicolor'],
  default: ''
},

  forSale: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: function() {
      return this.forSale === true;
    }
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Product', ProductSchema);