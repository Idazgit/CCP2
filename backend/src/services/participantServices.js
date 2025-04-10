import { participantRepository } from "../repositories/participantRepositories.js";
import { Participant } from "../models/participantModels.js";
import bcrypt from "bcrypt";

export const participantServices = {
  getAllParticipants() {
    return participantRepository.findAll();
  },

  async createParticipant(participantData) {
    const newParticipant = new Participant(
      null,
      participantData.name,
      participantData.email,
      participantData.password
    );

    const validation = newParticipant.isValide();
    if (!validation.valide) {
      throw new Error(validation.message);
    }

    newParticipant.password = await bcrypt.hash(newParticipant.password, 10);

    return participantRepository.create(newParticipant);
  },

  async authenticateParticipant(email, password) {
    const participant = await participantRepository.findByEmail(email);
    if (!participant) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, participant.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return {
      id: participant.participant_id,
      name: participant.name,
      email: participant.email,
    };
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
