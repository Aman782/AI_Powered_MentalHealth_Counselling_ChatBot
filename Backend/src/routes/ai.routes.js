// routes/ai.routes.js
import express from 'express';
import { handleMessage } from '../controllers/ai.controllers.js';
import { validateJWT_Token } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/message', validateJWT_Token, handleMessage);

export default router;
