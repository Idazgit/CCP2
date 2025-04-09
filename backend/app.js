import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
import participantRoutes from "./src/routes/participantRoutes.js";
import giveawayRoutes from "./src/routes/giveawayRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/participants", participantRoutes);
app.use("/giveaways", giveawayRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
