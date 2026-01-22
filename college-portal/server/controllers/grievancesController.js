import supabaseAdmin from "../supabaseAdmin.js";

export const createGrievance = async (req, res) => {
  const { user_id, message } = req.body;

  const { error } = await supabaseAdmin.from("grievances").insert({
    user_id,
    message,
    status: "Pending",
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Grievance submitted" });
};

export const getStudentGrievances = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("grievances")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getAllGrievances = async (_req, res) => {
  const { data } = await supabaseAdmin.from("grievances").select("*");
  res.json(data);
};

export const updateStatus = async (req, res) => {
  const { id, status } = req.body;

  await supabaseAdmin.from("grievances").update({ status }).eq("id", id);
  res.json({ message: "Updated" });
};
