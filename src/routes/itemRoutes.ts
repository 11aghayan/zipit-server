import express from 'express';

const itemsRouter = express.Router();

import {
  getAllItems_admin,
  getAllItems_public,
  getItem_public,
  getItem_admin,
  addItem,
  editItem,
  deleteItem,
  getRandomItems,
  getSimilarItems
} from '../controllers/itemControllers';

import { checkId, checkLang, checkSorting, convertPhotosToWebp, filterItems, verifyJWT } from '../middleware';
import checkItemBody from '../middleware/checkItemBody';

// Protected routes
itemsRouter.get('/admin', verifyJWT, checkSorting, filterItems, getAllItems_admin);
itemsRouter.post('/', verifyJWT, checkItemBody, convertPhotosToWebp, addItem);
itemsRouter.route('/item/:id') 
  .get(verifyJWT, checkId, getItem_admin)
  .put(verifyJWT, checkId, checkItemBody, convertPhotosToWebp, editItem)
  .delete(verifyJWT, checkId, deleteItem);

// Not protected routes
itemsRouter.get('/:lang', checkLang, checkSorting, filterItems, getAllItems_public);
itemsRouter.get('/:lang/random', checkLang, getRandomItems);
itemsRouter.post('/:lang/similar', checkLang, getSimilarItems);
itemsRouter.get('/:lang/:id', checkLang, checkId, getItem_public);

export default itemsRouter;