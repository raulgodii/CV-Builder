import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { sendEmail } from "../controllers/email.controller.js";

const router = Router();

router.get("/email", auth, sendEmail);

export default router;