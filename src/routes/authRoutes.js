import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rota protegida
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default router;