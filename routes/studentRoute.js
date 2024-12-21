import express from "express";
import { getStudent, getStudentById, createStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import upload from "../middlewares/uploadFile.js";
import updateStudentData from "../middlewares/updateStudentData.js";
const router = express.Router();


router.get("/", getStudent);
router.get("/:id", getStudentById);
router.post("/", upload.single("avatar"), createStudent);
router.put("/:id", upload.single("avatar"), updateStudentData, updateStudent);
router.delete("/:id", deleteStudent);

export default router;
