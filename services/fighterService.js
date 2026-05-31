import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getOne(id) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      const err = new Error("Fighter not found");
      err.status = 404;
      throw err;
    }

    return fighter;
  }

  create(data) {
    const existingFighter = fighterRepository
      .getAll()
      .find(item => item.name.toLowerCase() === data.name.toLowerCase());

    if (existingFighter) {
      const err = new Error("Fighter name already exists");
      err.status = 400;
      throw err;
    }

    return fightRepository.create(data);
  }

  update(id, data) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      const err = new Error("Fighter not found");
      err.status = 404;
      throw err;
    }

    if (data.name) {
      const existingFighter = fighterRepository
        .getAll()
        .find(item => item.name.toLowerCase() === data.name.toLowerCase() && item.id !== id);

      if (existingFighter) {
        const err = new Error("Fighter name already exists");
        err.status = 400;
        throw err;
      }
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      const err = new Error("Fighter not found");
      err.status = 404;
      throw err;
    }

    fighterRepository.delete(id);

    return fighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
