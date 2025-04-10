import { winnerRepository } from "../repositories/winnerRepositories.js";
import { Winner } from "../models/winnerModels.js";

export const winnerServices = {
  getAllWinners() {
    return winnerRepository.findAll();
  },

  getWinnerById(participant_id, giveaway_id) {
    return winnerRepository.findById(participant_id, giveaway_id);
  },

  async createWinner(winnerData) {
    const winner = new Winner(
      null,
      winnerData.participant_id,
      winnerData.giveaway_id,
      winnerData.prize_won
    );

    const validation = winner.isValide();
    if (!validation.valide) {
      throw new Error(validation.message);
    }

    const exists = await winnerRepository.findById(
      winnerData.participant_id,
      winnerData.giveaway_id
    );

    if (exists) {
      throw new Error("Winner already exists");
    }

    return winnerRepository.create(winner);
  },

  deleteWinner(participant_id, giveaway_id) {
    return winnerRepository.delete(participant_id, giveaway_id);
  },
};
