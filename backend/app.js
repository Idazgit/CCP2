import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
import participantRoutes from "./src/routes/participantRoutes.js";
import giveawayRoutes from "./src/routes/giveawayRoutes.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";
import winnerRoutes from "./src/routes/winnerRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/participants", participantRoutes);
app.use("/giveaways", giveawayRoutes);
app.use("/registrations", registrationRoutes);
app.use("/winners", winnerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
