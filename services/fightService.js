import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  getAll() {
    return fightRepository.getAll();
  }

  getOne(id) {
    return fightRepository.getOne(id);
  }

  create(fightData) {
    return fightRepository.create(fightData);
  }
}

const fightService = new FightService();

export { fightService };
