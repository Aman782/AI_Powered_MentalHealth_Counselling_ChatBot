import express from 'express';
import { registerUser, loginUser, logoutUser, refreshAccessTokenAfterExpiry, changePassword, changeUsername } from '../controllers/user.controllers.js';
import { validateJWT_Token } from '../middlewares/authentication.js';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(validateJWT_Token, logoutUser);
router.route('/refreshToken').post(refreshAccessTokenAfterExpiry);
router.route('/change-password').post(changePassword);
router.route('/change-username').post(changeUsername);

export {router as userRoute};

