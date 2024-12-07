import express from "express";
import { GetUniveristy, GetUniversityById, CreateUniversity, UpdateUniversity, DeleteUniversity } from "../controllers/universityController.js";
import upload from "../middlewares/uploadFile.js";

const router = express.Router();

router.get('/', GetUniveristy);
router.get('/:id', GetUniversityById);
router.post('/',upload.fields([{name:"coverImg",maxCount:1},{name:"images",maxCount:10}]), CreateUniversity);
router.put('/:id',upload.fields([{name:"coverImg",maxCount:1},{name:"images",maxCount:10}]), UpdateUniversity);
router.delete('/:id', DeleteUniversity);

export default router;