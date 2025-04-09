import { registrationServices } from "../services/registrationServices.js";

export const registrationController = {
  getAllRegistrations: async (req, res) => {
    try {
      const registrations = await registrationServices.getAllRegistrations();
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRegistrationById: async (req, res) => {
    try {
      const { participant_id, giveaway_id } = req.params;
      const registration = await registrationServices.getRegistrationById(
        parseInt(participant_id),
        parseInt(giveaway_id)
      );

      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      res.json(registration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRegistration: async (req, res) => {
    try {
      const registration = await registrationServices.createRegistration(
        req.body
      );
      res.status(201).json(registration);
    } catch (error) {
      if (error.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({
          error: "Participant already registered to this giveaway",
        });
      }

      res.status(400).json({ error: error.message });
    }
  },

  deleteRegistration: async (req, res) => {
    try {
      const { participant_id, giveaway_id } = req.params;
      const result = await registrationServices.deleteRegistration(
        parseInt(participant_id),
        parseInt(giveaway_id)
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: "Registration not found" });
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
