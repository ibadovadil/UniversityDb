import express from "express";
import { getStudent, getStudentById, createStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import upload from "../middlewares/uploadFile.js";
const router = express.Router();


router.get("/", getStudent);
router.get("/:id", getStudentById);
router.post("/", upload.single("avatar"), createStudent);
router.put("/:id", upload.single("avatar"), updateStudent);
router.delete("/:id", deleteStudent);

export default router;
