import express from 'express';

const itemsRouter = express.Router();

import {
  getAllItems_admin,
  getAllItems_public,
  getItem,
  addItem,
  editItem,
  deleteItem
} from '../controllers/itemControllers';

import { checkId, checkLang, convertPhotosToWebp, filterItems } from '../middleware';
import checkItemBody from '../middleware/checkItemBody';

// TODO: Add convertToWebp middleware to post and put routes 

itemsRouter.get('/admin', filterItems, getAllItems_admin);
itemsRouter.get('/:lang', checkLang, filterItems, getAllItems_public);
itemsRouter.get('/item/:lang/:id', checkLang, checkId, getItem);
itemsRouter.post('/', checkItemBody, convertPhotosToWebp, addItem);
itemsRouter.route('/:id') 
  .put(checkId, checkItemBody, convertPhotosToWebp, editItem)
  .delete(checkId, deleteItem);

export default itemsRouter;