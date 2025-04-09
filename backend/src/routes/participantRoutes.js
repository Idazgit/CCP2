import express from "express";
import { participantController } from "../controllers/participantControllers.js";

const router = express.Router();

router.get("/", participantController.getAllParticipants);
router.post("/", participantController.createParticipant);
router.get("/:id", participantController.getParticipantById);
router.put("/:id", participantController.updateParticipant);
router.delete("/:id", participantController.deleteParticipant);

export default router;
