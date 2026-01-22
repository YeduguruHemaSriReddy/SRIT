import express from "express";
import supabaseAdmin from "../supabaseAdmin.js";

const router = express.Router();

router.post("/student", async (req, res) => {
  try {
    const { id, name, email, department, year, section } = req.body;

    // insert into users
    await supabaseAdmin.from("users").insert({
      id,
      name,
      email,
      role: "student",
    });

    // insert into students
    await supabaseAdmin.from("students").insert({
      user_id: id,
      department,
      year,
      section,
    });

    res.json({ message: "Student registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
