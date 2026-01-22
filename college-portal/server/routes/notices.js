// server/routes/notices.js
import express from "express";
import supabaseAdmin from "../supabaseAdmin.js"; // ES module import

const router = express.Router();

// Create a notice
router.post("/create", async (req, res) => {
  const { title, description, target_role } = req.body;

  const { error } = await supabaseAdmin.from("notices").insert([
    { title, description, target_role },
  ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Notice created successfully" });
});

// Get all notices
router.get("/", async (req, res) => {
  const { data, error } = await supabaseAdmin.from("notices").select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

export default router;
