const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('../models/products');
const Review = require('../models/reviews');
const csvtojson = require("csvtojson");

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {	
importProducts: (req, res) => {
	
	  csvtojson()
	  .fromFile("./csv/products.csv")
	  .then(csvData => {
		
		mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		  let result = {};
		  let status = 200;
		  if (!err) {
			const payload = req.decoded;
			if (payload && payload.user === 'admin') {
				Product.insertMany(csvData).then(function(){ 
					
					result.status = status;
					result.result = "Data Inserted.";
					res.status(status).send(result);  

				}).catch(function(error){ 
							status = 500;
							result.status = status;
							result.error = error;
							res.status(status).send(result);
				});
				
			}else{
				
				status = 401;
				result.status = status;
				result.error = `Authentication error`;
				res.status(status).send(result);
			}

		  } else {
			status = 500;
			result.status = status;
			result.error = err;
			res.status(status).send(result);

			mongoose.connection.close();
		  }
		});

	 });		
  },
  
  reviewProducts: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true, useUnifiedTopology: true }, (err) => {
      let result = {};
      let status = 201;
      if (!err) {
		  
		const payload = req.decoded;
		if (payload && payload.user != 'admin') {  
			const { userId, barcode, review_content, createdAt } = req.body;
			const review = new Review({ userId, barcode, review_content, createdAt}); 
			
			Review.create(review)
			.then(function(dbReview) {
				return Review.findOneAndUpdate({ _id: dbReview._id }, {$push: {users: dbReview.userId}}, { new: true });
				
			})
			.then(function(dbReview) {
				return Product.findOneAndUpdate({ barcode: req.body.barcode }, {$push: {reviews: dbReview._id}}, { new: true 
				
				});
			})
			.then(function(dbProduct) {
				result.status = status;
				result.result = dbProduct;
				res.status(status).send(result);
			})
			.catch(function(err) {
				status = 500;
				result.status = status;
				result.error = err;
				res.status(status).send(result);
			
			});
			
		}else{
			
			status = 401;
			result.status = status;
			result.error = `Authentication error`;
			res.status(status).send(result);
			
		}
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);

        mongoose.connection.close();
      }
    });
  },
  
  searchProducts: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true, useUnifiedTopology: true }, (err) => {
      let products = {};
      let status = 201;
      if (!err) {
		  
			const { searchText } = req.body;
			let re = new RegExp(searchText);
			
			Product.findOne({ name: re})
			.populate('reviews')
			
			.exec((err, docs) => {
				if (!err){
					
					products.totalpro = 9;
					products.status = status;
					products.error = err;
					products.products = docs;	
				} 
				else{ 
					status = 500;
					products.status = status;
					products.error = err;
				} 
			  res.status(status).send(products);	
			});
			
      } else {
        status = 500;
        products.status = status;
        products.error = err;
        res.status(status).send(products);

        mongoose.connection.close();
      }
    });
  }

};
