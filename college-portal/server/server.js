import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noticesRoutes from "./routes/notices.js"; // NOTE: .js is required in ES modules
import registerRoutes from "./routes/register.js";
import downloadsRoutes from "./routes/downloads.js";
import grievancesRoutes from "./routes/grievances.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/register", registerRoutes);
app.use("/api/grievances", grievancesRoutes);
// Use notices routes
app.use("/api/notices", noticesRoutes);
app.use("/api/downloads", downloadsRoutes);
app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
