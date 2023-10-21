import express from 'express';

import { 
  checkCategoryLabel,
  checkId,
  checkLang,

 } from '../middleware';
import { 
  addCategory, 
  getCategories_admin,
  editCategory,
  deleteCategory,
  getCategories_public
 } from '../controllers/categoryControllers';

const categoryRouter = express.Router();

// Add 
categoryRouter.post('/', checkCategoryLabel, addCategory);
categoryRouter.get('/admin', getCategories_admin);
categoryRouter.route('/:id')
 .put(checkId, checkCategoryLabel, editCategory)
 .delete(checkId, deleteCategory);
categoryRouter.get('/:lang', checkLang, getCategories_public);

export default categoryRouter;