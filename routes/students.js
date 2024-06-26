import Router from "express";

import {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  updateStudentById,
} from "../controllers/students.js";

const router = Router();

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.post("/", addStudent);

router.put("/:id", updateStudentById);

router.delete("/:id", deleteStudentById);

export default router;
