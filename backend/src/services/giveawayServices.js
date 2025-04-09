import { giveawayRepository } from "../repositories/giveawayRepositories.js";
import { Giveaway } from "../models/giveawayModels.js";

export const giveawayServices = {
  getAllGiveaways() {
    return giveawayRepository.findAll();
  },

  createGiveaway(giveawayData) {
    const newGiveaway = new Giveaway(
      null,
      giveawayData.name,
      giveawayData.prize,
      giveawayData.draw_date
    );
    const validation = newGiveaway.isValide();
    if (!validation.valide) {
      throw new Error(validation.message);
    }
    return giveawayRepository.create(newGiveaway);
  },

  getGiveawayById(id) {
    return giveawayRepository.findById(id);
  },

  updateGiveaway(id, giveawayData) {
    const updatedGiveaway = new Giveaway(
      id,
      giveawayData.name,
      giveawayData.prize,
      giveawayData.draw_date
    );
    const validation = updatedGiveaway.isValide();
    if (!validation.valide) {
      throw new Error(validation.message);
    }
    return giveawayRepository.update(updatedGiveaway);
  },

  deleteGiveaway(id) {
    return giveawayRepository.delete(id);
  },
};
