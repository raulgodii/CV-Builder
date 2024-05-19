import { Router } from "express";
import { convert, updateCv, getCvs, getCv, deleteCv, createCv, uploadFotoRequest, loadFoto } from "../controllers/cv.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { uploadFoto } from "../middlewares/upload.middleware.js";

const router = Router();

router.post('/convert', auth, convert);

router.get("/cvs", auth, getCvs);

router.post("/cvs", auth, createCv);

router.get("/cvs/:id", auth, getCv);

router.put("/cvs/:id", auth, updateCv);

router.delete("/cvs/:id", auth, deleteCv);

router.post('/cv/uploadFoto/:id', auth, uploadFoto, uploadFotoRequest);

router.get('/cv/files/:file', auth, loadFoto);

// router.get('/cv/loadFoto/:nombreFoto', auth, loadFoto);



export default router;