import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/tasks', auth, (req, res) => {
    res.send('tasks');
});

export default router;