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

import { checkId, checkLang, convertPhotosToWebp, filterItems, verifyJWT } from '../middleware';
import checkItemBody from '../middleware/checkItemBody';

itemsRouter.get('/admin', verifyJWT, filterItems, getAllItems_admin);
itemsRouter.get('/:lang', checkLang, filterItems, getAllItems_public);
itemsRouter.get('/item/:lang/:id', checkLang, checkId, getItem);
itemsRouter.post('/', verifyJWT, checkItemBody, convertPhotosToWebp, addItem);
itemsRouter.route('/:id') 
  .put(verifyJWT, checkId, checkItemBody, convertPhotosToWebp, editItem)
  .delete(verifyJWT, checkId, deleteItem);

export default itemsRouter;