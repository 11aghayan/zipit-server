import express from 'express';

import { 
  checkCategoryLabel,
  checkId,

 } from '../middleware';
import { 
  addCategory, 
  getCategories_admin,
  editCategory,
  deleteCategory,
  getCategories_public
 } from '../controllers';

const categoryRouter = express.Router();

// Add 
categoryRouter.post('/', checkCategoryLabel, addCategory);
categoryRouter.get('/admin', getCategories_admin);
categoryRouter.route('/:id')
 .put(checkId, checkCategoryLabel, editCategory)
 .delete(checkId, deleteCategory);
categoryRouter.get('/:lang', getCategories_public);

export default categoryRouter;