import { giveawayServices } from "../services/giveawayServices.js";

export const giveawayController = {
  getAllGiveaways: async (req, res) => {
    try {
      const giveaways = await giveawayServices.getAllGiveaways();
      res.json(giveaways);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGiveawayById: async (req, res) => {
    try {
      const giveaway = await giveawayServices.getGiveawayById(req.params.id);
      if (!giveaway) {
        return res.status(404).json({ error: "Giveaway not found" });
      }
      res.json(giveaway);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createGiveaway: async (req, res) => {
    try {
      const giveaway = await giveawayServices.createGiveaway(req.body);
      res.status(201).json(giveaway);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateGiveaway: async (req, res) => {
    try {
      const result = await giveawayServices.updateGiveaway(
        req.params.id,
        req.body
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteGiveaway: async (req, res) => {
    try {
      const result = await giveawayServices.deleteGiveaway(req.params.id);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Giveaway not found" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
