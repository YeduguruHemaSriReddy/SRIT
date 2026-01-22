import express from "express";
import {
  createGrievance,
  getStudentGrievances,
  getAllGrievances,
  updateStatus,
} from "../controllers/grievancesController.js";

const router = express.Router();

router.post("/", createGrievance);
router.get("/student/:userId", getStudentGrievances);
router.get("/", getAllGrievances);
router.put("/", updateStatus);

export default router;
