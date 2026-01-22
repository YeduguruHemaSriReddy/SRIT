// server/supabaseAdmin.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // ensure env variables are loaded

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,              // matches your .env
  process.env.SUPABASE_SERVICE_ROLE_KEY  // matches your .env
);

export default supabaseAdmin;
