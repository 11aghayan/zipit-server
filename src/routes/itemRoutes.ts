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

import { checkId, checkLang } from '../middleware';
import checkItemBody from '../middleware/checkItemBody';

itemsRouter.get('/admin', getAllItems_admin);
itemsRouter.get('/:lang', checkLang, getAllItems_public);
itemsRouter.get('/item/:lang/:id', checkLang, checkId, getItem);
itemsRouter.post('/', checkItemBody, addItem);
itemsRouter.route('/:id') 
  .put(checkId, checkItemBody, editItem)
  .delete(checkId, deleteItem);

export default itemsRouter;