import { Router } from "express";
import { convert, updateCv, getCvs, getCv, deleteCv, createCv } from "../controllers/cv.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/convert', auth, convert);

router.get("/cvs", auth, getCvs);

router.post("/cvs", auth, createCv);

router.get("/cvs/:id", auth, getCv);

router.put("/cvs/:id", auth, updateCv);

router.delete("/cvs/:id", auth, deleteCv);


export default router;