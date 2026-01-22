import supabaseAdmin from "../supabaseAdmin.js";

export const createNotice = async (req, res) => {
  try {
    const { title, description, target_role } = req.body;

    const { error } = await supabaseAdmin.from("notices").insert([
      {
        title,
        description,
        target_role,
        created_at: new Date()
      }
    ]);

    if (error) throw error;

    res.status(201).json({ message: "Notice created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getNotices = async (req, res) => {
  const { role } = req.query;

  const { data, error } = await supabaseAdmin
    .from("notices")
    .select("*")
    .or(`target_role.eq.${role},target_role.eq.all`)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
