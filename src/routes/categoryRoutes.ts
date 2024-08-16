import express from 'express';

import { 
  checkCategoryLabel,
  checkId,
  checkLang,
  verifyJWT,

 } from '../middleware';
import { 
  addCategory, 
  getCategories_admin,
  editCategory,
  deleteCategory,
  getCategories_public,
  getCategory
 } from '../controllers/categoryControllers';

const categoryRouter = express.Router();

// Protected Routes
categoryRouter.post('/', verifyJWT, checkCategoryLabel, addCategory);
categoryRouter.get('/admin', verifyJWT, getCategories_admin);
categoryRouter.route('/:id')
 .get(verifyJWT, checkId, getCategory)
 .put(verifyJWT, checkId, checkCategoryLabel, editCategory)
 .delete(verifyJWT, checkId, deleteCategory);

// Not Protected Routes
categoryRouter.get('/:lang', checkLang, getCategories_public);

export default categoryRouter;