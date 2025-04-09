import { participantRepository } from "../repositories/participantRepositories.js";
import { Participant } from "../models/participantModels.js";

export const participantServices = {
  getAllParticipants() {
    return participantRepository.findAll();
  },

  createParticipant(participantData) {
    const newParticipant = new Participant(
      null,
      participantData.name,
      participantData.email
    );
    const validation = newParticipant.isValide();
    if (!validation.valide) {
      throw new Error(validation.message);
    }
    return participantRepository.create(newParticipant);
  },
  getParticipantById(id) {
    return participantRepository.findById(id);
  },
  updateParticipant(id, participantData) {
    const updatedParticipant = new Participant(
      id,
      participantData.name,
      participantData.email
    );
    const validation = updatedParticipant.isValide();
    if (!validation.valide) {
      throw new Error(validation.erreur);
    }
    return participantRepository.update(updatedParticipant);
  },
  deleteParticipant(id) {
    return participantRepository.delete(id);
  },
};
