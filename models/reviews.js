const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];


// schema maps to a collection
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: 'String',
    required: true,
    trim: true,
	index: true
  },
  barcode: {
   type: 'Number',
   trim: true
  },
  review_content: {
    type: 'String',
    required: true,
    trim: true
  },
  createdAt: {
    type: Date, 
	default: Date.now
  },
  users: [{ 
      type: Schema.Types.ObjectId,
      ref: "User"
   }]
  
 
});



module.exports = mongoose.model('Review', reviewSchema); // instance of schema