import * as express from 'express';

import UserCtrl from '../controllers/user';
import ProductController = require('../controllers/product.controller');
import SubCategoryController = require('../controllers/subCategory.controller');
import CategoryController = require('../controllers/category.controller');

import {PREFIX_API_URL, PRODUCTS_API_URL, CATEGORIES_API_URL,
SUBCATEGORIES_API_URL, LOGIN_API_URL, USERE_API_URL} from '../constants/api';


export default function setRoutes(app) {

  let productController = new ProductController();
  let subCategoryController = new SubCategoryController();
  let categoryController = new CategoryController();

  const router = express.Router();

  const userCtrl = new UserCtrl();

  router.get(PRODUCTS_API_URL, productController.retrieve);
  router.post(PRODUCTS_API_URL, productController.create);
  router.put(`${PRODUCTS_API_URL}:_id`, productController.update);
  router.get(`${PRODUCTS_API_URL}:_id`, productController.findById);
  router.delete(`${PRODUCTS_API_URL}:_id`, productController.delete);

  router.get(CATEGORIES_API_URL, categoryController.retrieve);
  router.post(CATEGORIES_API_URL, categoryController.create);
  router.put(`${CATEGORIES_API_URL}:_id`, categoryController.update);
  router.get(`${CATEGORIES_API_URL}:_id`, categoryController.findById);
  router.delete(`${CATEGORIES_API_URL}:_id`, categoryController.delete);

  router.get(SUBCATEGORIES_API_URL, subCategoryController.retrieve);
  router.post(SUBCATEGORIES_API_URL, subCategoryController.create);
  router.put(`${SUBCATEGORIES_API_URL}:_id`, subCategoryController.update);
  router.get(`${SUBCATEGORIES_API_URL}:_id`, subCategoryController.findById);
  router.delete(`${SUBCATEGORIES_API_URL}:_id`, subCategoryController.delete);  


  router.route(`${LOGIN_API_URL}`).post(userCtrl.login);
  router.route(`${USERE_API_URL}`).post(userCtrl.insert);
  router.route(`${USERE_API_URL}:id`).get(userCtrl.get);

  app.use(`${PREFIX_API_URL}`, router);

}
