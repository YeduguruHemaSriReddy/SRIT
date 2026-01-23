import express from "express";
import { getDownloads } from "../controllers/downloadController.js";

const router = express.Router();

router.get("/", getDownloads);

export default router;
