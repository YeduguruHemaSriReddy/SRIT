const express = require("express");
const router = express.Router();
const { getStudentProfile } = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");

router.get("/profile", auth, getStudentProfile);

module.exports = router;
