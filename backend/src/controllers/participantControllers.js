import { participantServices } from "../services/participantServices.js";

export const participantController = {
  getAllParticipants: async (req, res) => {
    try {
      const participants = await participantServices.getAllParticipants();
      res.json(participants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getParticipantById: async (req, res) => {
    try {
      const participant = await participantServices.getParticipantById(
        req.params.id
      );
      if (!participant) {
        return res.status(404).json({ error: "Participant not found" });
      }
      res.json(participant);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createParticipant: async (req, res) => {
    try {
      const participant = await participantServices.createParticipant(req.body);
      res.status(201).json(participant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateParticipant: async (req, res) => {
    try {
      const result = await participantServices.updateParticipant(
        req.params.id,
        req.body
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteParticipant: async (req, res) => {
    try {
      const result = await participantServices.deleteParticipant(req.params.id);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Participant not found" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async loginParticipant(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const participant = await participantServices.authenticateParticipant(
        email,
        password
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: participant, // Possibly include token after
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};
