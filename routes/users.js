const controller = require('../controllers/users');
const productcontroller = require('../controllers/products');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/users/register')
    .post(controller.add)
    .get(validateToken, controller.getAll); // This route will be protected
  
  router.route('/users')
    .get(validateToken, controller.getAll);
  
  router.route('/login')
    .post(controller.login);
	
  router.route('/products')
    .post(validateToken, productcontroller.importProducts);

  router.route('/products/review')
    .post(validateToken, productcontroller.reviewProducts);	

  router.route('/products/search')
    .post(productcontroller.searchProducts);			
};