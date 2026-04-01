import express from 'express';
import * as serviceController from '../controllers/serviceController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas protegidas
router.post('/create', authMiddleware, serviceController.create);
router.get('/list', authMiddleware, serviceController.list);
//router.delete('/:id', authMiddleware, serviceController.remove);

export default router;