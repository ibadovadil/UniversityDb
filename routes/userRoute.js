import express from "express";
import { createUser, deleteUser, updateUser, userList } from "../controllers/userController.js";
const router = express.Router();

router.get('/', userList);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;