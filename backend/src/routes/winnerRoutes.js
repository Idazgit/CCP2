import express from "express";
import { winnerControllers } from "../controllers/winnerControllers.js";

const router = express.Router();

router.get("/", winnerControllers.getAllWinners);
router.get("/:participant_id/:giveaway_id", winnerControllers.getWinnerById);
router.get("/results", winnerControllers.getResults);
router.post("/", winnerControllers.createWinner);
router.post("/draw/:giveaway_id", winnerControllers.drawWinner);
router.delete("/:participant_id/:giveaway_id", winnerControllers.deleteWinner);

export default router;
