import express from "express";
import { registrationController } from "../controllers/registrationControllers.js";

const router = express.Router();

router.get("/", registrationController.getAllRegistrations);
router.get(
  "/:participant_id/:giveaway_id",
  registrationController.getRegistrationById
);
router.post("/", registrationController.createRegistration);
router.delete(
  "/:participant_id/:giveaway_id",
  registrationController.deleteRegistration
);

export default router;
