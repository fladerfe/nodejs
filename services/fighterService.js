import { fighterRepository } from "../repositories/fighterRepository.js";

const fighterImages = [
  "https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif",
  "https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif",
  "https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif",
  "https://media1.giphy.com/media/nlbIvY9K0jfAA/source.gif",
  "https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif",
  "http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif",
];


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

    const fighter = {
      ...data,
      image: fighterImages[Math.floor(Math.random() * fighterImages.length)]
    }

    return fighterRepository.create(fighter);
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
