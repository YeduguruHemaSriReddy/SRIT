const { supabase } = require("../utils/supabaseClient");

exports.getStudentProfile = async (req, res) => {
  const userId = req.user.id; // from JWT middleware

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};
