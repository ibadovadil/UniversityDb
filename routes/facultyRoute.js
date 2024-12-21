import express from "express";
import { CreateFaculty, deleteFaculty, GetFaculty, GetFacultyById, UpdateFaculty } from "../controllers/facultyController.js";
import facultyFilter from "../middlewares/facultyFilter.js"; 

const router = express.Router();

router.get('/', facultyFilter, GetFaculty); 
router.get('/:id', GetFacultyById);
router.post('/', CreateFaculty);
router.put('/:id', UpdateFaculty);
router.delete('/:id', deleteFaculty);

export default router;
