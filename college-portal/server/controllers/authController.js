import jwt from "jsonwebtoken";
import { supabaseAdmin } from "../supabaseAdmin.js";

const BRANCH_CODES = ["01", "02", "03", "05", "10", "32", "33"];

/*
Branch mapping (example – optional)
01 → Civil
02 → EEE
03 → ME
05 → ECE
10 → CSE
32 → CSD
33 → CSM
*/

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  /* ---------- BASIC VALIDATION ---------- */
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (!email.endsWith("@srit.ac.in")) {
    return res.status(400).json({ message: "Only SRIT emails allowed" });
  }

  /* ---------- SUPABASE AUTH ---------- */
  const { data, error } =
    await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const userId = data.user.id;
  const username = email.split("@")[0].toLowerCase();

  /* ---------- STUDENT PATTERN ---------- */
  const studentRegex = /^[0-9]{2}g(1a|5a)[0-9]{2}[0-9]{2}$/;

  let role = "faculty";
  let payload = { email, role };

  if (studentRegex.test(username)) {
    const year = username.slice(0, 2);
    const admissionType = username.includes("5a")
      ? "lateral"
      : "regular";
    const branchCode = username.slice(-2);

    if (!BRANCH_CODES.includes(branchCode)) {
      return res.status(400).json({ message: "Invalid branch code" });
    }

    role = "student";
    payload = {
      role,
      email,
      userId,
      year,
      branchCode,
      admissionType,
    };
  }

  /* ---------- VERIFY ROLE FROM DB ---------- */
  const { data: dbUser } = await supabaseAdmin
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (!dbUser || dbUser.role !== role) {
    return res
      .status(403)
      .json({ message: "Unauthorized role access" });
  }

  /* ---------- JWT ---------- */
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  /* ---------- SUCCESS ---------- */
  return res.json({
    token,
    role,
    user: payload,
  });
};
