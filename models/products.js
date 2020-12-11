const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: 'String',
    required: true,
    trim: true
  },
  barcode: {
    type: 'Number',
    required: true,
    trim: true
  },
  brand: {
    type: 'String',
    required: true,
    trim: true
  },
  description: {
    type: 'String',
    required: true,
    trim: true
  },
  price: {
    type: 'Number',
    required: true,
    trim: true
  },
  available: {
    type: 'Boolean',
    required: true,
    trim: true
  },
  reviews: [{ 
      type: Schema.Types.ObjectId,
      ref: "Review"
   }]
  
  
});



module.exports = mongoose.model('Product', productSchema); // instance of schema