import { Router } from "express";
import { login, register, logout, profile, verifyToken, convert } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', auth, profile);

router.post('/convert', auth, convert);

export default router;