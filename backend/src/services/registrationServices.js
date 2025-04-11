import { registrationRepository } from "../repositories/registrationRepositories.js";
import { Registration } from "../models/registrationModels.js";
import { winnerRepository } from "../repositories/winnerRepositories.js";

export const registrationServices = {
  getAllRegistrations() {
    return registrationRepository.findAll();
  },

  getRegistrationById(participant_id, giveaway_id) {
    return registrationRepository.findById(participant_id, giveaway_id);
  },

  async createRegistration(participantData) {
    const registration = new Registration(
      null,
      participantData.participant_id,
      participantData.giveaway_id
    );

    const validation = registration.isValide();
    if (!validation.valide) {
      throw new Error(validation.message);
    }

    const existingWinner = await winnerRepository.findByGiveawayId(
      participantData.giveaway_id
    );
    if (existingWinner) {
      throw new Error(
        "This giveaway has already been drawn. Registration is not allowed."
      );
    }

    const exists = await registrationRepository.findById(
      participantData.participant_id,
      participantData.giveaway_id
    );

    if (exists) {
      throw new Error("Already registered");
    }

    return registrationRepository.create(registration);
  },
  deleteRegistration(participant_id, giveaway_id) {
    return registrationRepository.delete(participant_id, giveaway_id);
  },
};
