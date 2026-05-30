import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  getAll() {
    return fighterRepository.getAll();
  }

  getOne(id) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      throw new Error("Fighter not found");
    }

    return fighter;
  }

  create(data) {
    const existingFighter = fighterRepository
      .getAll()
      .find(item => item.name.toLowerCase() === data.name.toLowerCase());

    if (existingFighter) {
      throw new Error("Fighter name already exists");
    }

    return fightRepository.create(data);
  }

  update(id, data) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      throw new Error("Fighter not found");
    }

    if (data.name) {
      const existingFighter = fighterRepository
        .getAll()
        .find(item => item.name.toLowerCase() === data.name.toLowerCase() && item.id !== id);

      if (existingFighter) {
        throw new Error("Fighter name already exists");
      }
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      throw new Error("Fighter not found");
    }

    fighterRepository.delete(id);

    return fighter;
  }
}

const fightersService = new FightersService();

export { fightersService };
