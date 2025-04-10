import { winnerServices } from "../services/winnerServices.js";

export const winnerControllers = {
  async getAllWinners(req, res) {
    try {
      const winners = await winnerServices.getAllWinners();
      res.status(200).json(winners);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getWinnerById(req, res) {
    const { participant_id, giveaway_id } = req.params;
    try {
      const winner = await winnerServices.getWinnerById(
        participant_id,
        giveaway_id
      );
      if (!winner) {
        return res.status(404).json({ error: "Winner not found" });
      }
      res.status(200).json(winner);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createWinner(req, res) {
    try {
      const winnerData = req.body;
      const newWinner = await winnerServices.createWinner(winnerData);
      res.status(201).json(newWinner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteWinner(req, res) {
    const { participant_id, giveaway_id } = req.params;
    try {
      const result = await winnerServices.deleteWinner(
        participant_id,
        giveaway_id
      );
      if (result.changes === 0) {
        return res.status(404).json({ error: "Winner not found" });
      }
      res.status(200).json({ message: "Winner deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
