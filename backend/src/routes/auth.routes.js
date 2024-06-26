import { Router } from "express";
import { login, loginGoogle, register, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/loginGoogle', loginGoogle);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', auth, profile);

export default router;