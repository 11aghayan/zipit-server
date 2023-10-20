import express from 'express';

import { checkCategoryLabel } from '../middleware';
import { 
  addCategory, 
  getCategories_admin,
  editCategory,
  deleteCategory
 } from '../controllers';

const categoryRouter = express.Router();

// Add 
categoryRouter.post('/', checkCategoryLabel, addCategory);
categoryRouter.get('/admin', getCategories_admin);
categoryRouter.route('/:id')
 .put(editCategory)
 .delete(deleteCategory);

export default categoryRouter;