// routes/ai.routes.js
import express from 'express';
import { handleVideoCall } from '../controllers/ai.controllers.js';
// import {handleMessage} from '../controllers/ai2.controllers.js';
// import { handleMessage } from '../controllers/ai3.controllers.js';
import { handleMessage } from '../controllers/ai4.controllers.js';
import { validateJWT_Token } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/message', validateJWT_Token, handleMessage);
router.post('/start-video-call', validateJWT_Token, handleVideoCall);

export default router;
