import supabaseAdmin from "../supabaseAdmin.js";

export const getDownloads = async (req, res) => {
  const { role } = req.query;

  const { data, error } = await supabaseAdmin
    .from("downloads")
    .select("*")
    .or(`target_role.eq.${role},target_role.eq.all`)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};
