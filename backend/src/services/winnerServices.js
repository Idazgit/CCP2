import { winnerRepository } from "../repositories/winnerRepositories.js";
import { Winner } from "../models/winnerModels.js";
import { registrationRepository } from "../repositories/registrationRepositories.js";
import { giveawayRepository } from "../repositories/giveawayRepositories.js";

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

  async drawWinner(giveaway_id) {
    const existingWinner = await winnerRepository.findByGiveawayId(giveaway_id);
    if (existingWinner) {
      throw new Error("This giveaway has already been drawn.");
    }

    const participants =
      await registrationRepository.findParticipantsByGiveaway(giveaway_id);

    if (!participants || participants.length === 0) {
      throw new Error("No participants registered for this giveaway.");
    }

    const randomIndex = Math.floor(Math.random() * participants.length);
    const selected = participants[randomIndex];

    const giveaway = await giveawayRepository.findById(giveaway_id);
    if (!giveaway) {
      throw new Error("Giveaway not found.");
    }

    await winnerRepository.create({
      participant_id: selected.participant_id,
      giveaway_id: giveaway_id,
      prize_won: giveaway.prize,
    });

    return selected;
  },
};
