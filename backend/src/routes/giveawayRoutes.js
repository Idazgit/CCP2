import express from "express";
import { giveawayController } from "../controllers/giveawayControllers.js";

const router = express.Router();

router.get("/", giveawayController.getAllGiveaways);
router.post("/", giveawayController.createGiveaway);
router.get("/:id", giveawayController.getGiveawayById);
router.put("/:id", giveawayController.updateGiveaway);
router.delete("/:id", giveawayController.deleteGiveaway);

export default router;
